import p5 from "p5";
import BaseObject from "./BaseObject";
import Map from "./Map";
import Inventory from "./Inventory";
import Gun from "./item/Gun";
import Box from "./item/Box";
import Item from "./item/Item";

export default class Player extends BaseObject {
    public static DIAMETER: number = 30;
    
    private map: Map;
    
    private inventory: Inventory;

    private speed: number = 6;

    private directionFacing = { x: 1, y: 0 };

    constructor(map: Map, x: number = 0, y: number = 0) {
        super(x, y);

        this.map = map;

        this.inventory = new Inventory();

        this.inventory.addItem(new Gun());
        this.inventory.addItem(new Box(), 5);

        this.initEvent();
    }

    private initEvent(): void {
        this.inventory.onItemDropped = (itemDropped: Item) => {
            const len = Math.hypot(this.directionFacing.x, this.directionFacing.y);
            let newX = this.x + (this.directionFacing.x / len) * Map.CELL_SIZE;
            let newY = this.y + (this.directionFacing.y / len) * Map.CELL_SIZE;

            itemDropped.setX(newX);
            itemDropped.setY(newY);

            this.map.addItem(itemDropped);
        }
    }

    public UpdateControls(p: p5): void {
        if (!p.keyIsPressed) {
            return;
        }

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
            { x: newX - Player.DIAMETER / 2, y: this.y - Player.DIAMETER / 2 },
            { x: newX - Player.DIAMETER / 2, y: this.y + Player.DIAMETER / 2 },
            { x: newX + Player.DIAMETER / 2, y: this.y - Player.DIAMETER / 2 },
            { x: newX + Player.DIAMETER / 2, y: this.y + Player.DIAMETER / 2 },
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
            { x: this.x - Player.DIAMETER / 2, y: newY - Player.DIAMETER / 2 },
            { x: this.x + Player.DIAMETER / 2, y: newY - Player.DIAMETER / 2 },
            { x: this.x - Player.DIAMETER / 2, y: newY + Player.DIAMETER / 2 },
            { x: this.x + Player.DIAMETER / 2, y: newY + Player.DIAMETER / 2 },
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

        // Check items collision
        this.map.getItems().forEach((newItem: Item) => {
            let d = p.dist(newItem.getX(), newItem.getY(), this.x, this.y);
            if (d < Map.CELL_SIZE) {                
                // Try to collect the item
                this.inventory.addItem(newItem);
            }
        });
        this.map.clearItemsPicked();
    }

    public resize(width: number, height: number): void {
        this.inventory.resize(width, height);
    }

    public draw(p: p5): void {
        p.fill(0, 200, 0);
        p.stroke(0);
        p.strokeWeight(1);
        
        p.push();
        p.translate(this.x, this.y)
        p.ellipse(0, 0, Player.DIAMETER, Player.DIAMETER);

        let angle = 0;
        
        if (this.directionFacing.x !== 0) {
            angle = p.atan(this.directionFacing.y / this.directionFacing.x);
        }
        else {
            angle = this.directionFacing.y > 0 ? p.PI/2 : -p.PI/2;
        }

        if (this.directionFacing.x < 0) angle += p.PI;

        let deltaAngle = p.PI / 9;

        p.fill(0);
        p.ellipse(Player.DIAMETER/2 * p.cos(angle+deltaAngle), Player.DIAMETER/2 * p.sin(angle+deltaAngle), Player.DIAMETER/5, Player.DIAMETER/5);
        p.ellipse(Player.DIAMETER/2 * p.cos(angle-deltaAngle), Player.DIAMETER/2 * p.sin(angle-deltaAngle), Player.DIAMETER/5, Player.DIAMETER/5);

        p.pop();

        this.inventory.draw(p);
    }
}