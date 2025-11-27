import p5 from "p5";
import Map from "../Map";
import Inventory from "../Inventory";
import Gun from "../item/Gun";
import Box from "../item/Box";
import Item from "../item/Item";
import Entity from "./Entity";
import { COLORS } from "../../colors";
import Utils from "../../tools/Utils";

export default class Player extends Entity {   
    private map: Map;
    
    private inventory: Inventory;

    private dropUsed = false;
    private actionUsed = false;

    constructor(map: Map, x: number = 0, y: number = 0) {
        super(x, y);

        this.map = map;

        this.inventory = new Inventory();

        this.inventory.addItem(new Gun());
        this.inventory.addItem(new Box(), 5);

        this.diameter = 30;
        this.speed = 6;
        this.color = COLORS.green;
    }

    private resetBoleansControl(): void {
        this.dropUsed = false;
        this.actionUsed = false;
    }


    public updateControls(p: p5): void {
        if (!p.keyIsPressed) {
            this.resetBoleansControl();
            return;
        }

        this.handleCellCollisions(p);

        this.handleItemCollisions();

        this.handleItemControls(p);
    }

    public handleCellCollisions(p: p5): void {
        let newDirectionFacing = { x:0, y: 0 };
            
        let dx = 0;
        let dy = 0;

        if (p.keyIsDown(p.UP_ARROW)) {
            dy -= 1;
            newDirectionFacing.y -= 1;
        }
        if (p.keyIsDown(p.DOWN_ARROW)) {
            dy += 1;
            newDirectionFacing.y += 1;
        }
        if (p.keyIsDown(p.LEFT_ARROW)) {
            dx -= 1;
            newDirectionFacing.x -= 1;
        }
        if (p.keyIsDown(p.RIGHT_ARROW)) {
            dx += 1;
            newDirectionFacing.x += 1;
        }

        // No movement
        if (dx === 0 && dy === 0) return;
        else this.directionFacing = newDirectionFacing;

        // Normalize diagonal speed so total speed remains constant
        const len = Math.hypot(dx, dy);
        let newX = this.x + (dx / len) * this.speed;
        let newY = this.y + (dy / len) * this.speed;

        // Check collision for X-axis movement
        let canMoveX = true;
        const xCorners = [
            { x: newX - this.diameter / 2, y: this.y - this.diameter / 2 },
            { x: newX - this.diameter / 2, y: this.y + this.diameter / 2 },
            { x: newX + this.diameter / 2, y: this.y - this.diameter / 2 },
            { x: newX + this.diameter / 2, y: this.y + this.diameter / 2 },
        ];
        for (const corner of xCorners) {
            if (this.map.getCell(corner.x, corner.y)?.getCellOptions().isSolid) {
                canMoveX = false;
                break;
            }
        }

        // Check collision for Y-axis movement
        let canMoveY = true;
        const yCorners = [
            { x: this.x - this.diameter / 2, y: newY - this.diameter / 2 },
            { x: this.x + this.diameter / 2, y: newY - this.diameter / 2 },
            { x: this.x - this.diameter / 2, y: newY + this.diameter / 2 },
            { x: this.x + this.diameter / 2, y: newY + this.diameter / 2 },
        ];
        for (const corner of yCorners) {
            if (this.map.getCell(corner.x, corner.y)?.getCellOptions().isSolid) {
                canMoveY = false;
                break;
            }
        }

        // No movement allowed
        if (!canMoveX && !canMoveY) return;

        // Apply movement on axes that are clear
        if (canMoveX) this.x = newX;
        if (canMoveY) this.y = newY;
    }

    public handleItemCollisions(): void {
        // Check items collision
        this.map.getItems().forEach((newItem: Item) => {
            if (this.isCollidingWith(newItem)) this.inventory.addItem(newItem);
        });
        this.map.clearItemsPicked();
    }

    public handleItemControls(p: p5): void {
        if (p.keyIsDown('a') && !this.dropUsed) {
            this.dropUsed = true;
            
            const itemDropped = this.inventory.dropCurrentItem();

            if (itemDropped) {
                const angleFacing = this.getAngleFacing();
                const range = Utils.getRandomNumber(1, 1.2);

                let newX = this.x + Math.cos(angleFacing) * Map.CELL_SIZE * range;
                let newY = this.y + Math.sin(angleFacing) * Map.CELL_SIZE * range;

                if (this.map.getCell(newX, newY)?.getCellOptions().isSolid) {
                    const cellCoords = Map.parseCoordsToCell(this.x, this.y);
                    const centerCellX = cellCoords.cellX * Map.CELL_SIZE + Map.CELL_SIZE / 2;
                    const centerCellY = cellCoords.cellY * Map.CELL_SIZE + Map.CELL_SIZE / 2;

                    newX = centerCellX + Math.cos(angleFacing) * Map.CELL_SIZE * 0.5;
                    newY = centerCellY + Math.sin(angleFacing) * Map.CELL_SIZE * 0.5;
                }
    
                itemDropped.setX(newX);
                itemDropped.setY(newY);
    
                this.map.addItems(itemDropped);
            }
        } else if (!p.keyIsDown('a')) {
            this.dropUsed = false;
        }

        if (p.keyIsDown(' ') && (!this.actionUsed || true)) {   // <--------------------- Shot auto ?
            this.actionUsed = true;

            const success = this.inventory.getItemSelected()?.use(this, this.map);
            if (success) this.inventory.removeItemFromCurrentSlot();             
        } else if (!p.keyIsDown(' ')) {
            this.actionUsed = false;
        }
    }

    public resize(width: number, height: number): void {
        this.inventory.resize(width, height);
    }

    public draw(p: p5): void {
        super.draw(p);

        this.inventory.draw(p);
    }
}