import p5 from "p5";
import BaseObject from "./BaseObject";
import Map from "./Map";
import Inventory from "./Inventory";
import Gun from "./item/Gun";
import Box from "./item/Box";
import Item from "./item/Item";

export default class Player extends BaseObject {
    public static DIAMETER: number = 30;
    
    private p5: p5;
    
    private inventory: Inventory;

    private speed: number = 6;

    private directionFacing = { x: 1, y: 0 };

    constructor(p5: p5, x: number = 0, y: number = 0) {
        super(x, y);

        this.p5 = p5;
        this.inventory = new Inventory();

        this.inventory.addItem(new Gun());
        this.inventory.addItem(new Box(), 5);
    }

    public UpdateControls(map: Map): void {
        if (!this.p5.keyIsPressed) {
            return;
        }

        let newDirectionFacing = { x:0, y: 0 };
            
        let dx = 0;
        let dy = 0;

        if (this.p5.keyIsDown(this.p5.UP_ARROW)) {
            dy -= 1;
            newDirectionFacing.y -= 1;
        }
        if (this.p5.keyIsDown(this.p5.DOWN_ARROW)) {
            dy += 1;
            newDirectionFacing.y += 1;
        }
        if (this.p5.keyIsDown(this.p5.LEFT_ARROW)) {
            dx -= 1;
            newDirectionFacing.x -= 1;
        }
        if (this.p5.keyIsDown(this.p5.RIGHT_ARROW)) {
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
            if (map.getCell(corner.x, corner.y)?.getCellOptions().isSolid) {
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
            if (map.getCell(corner.x, corner.y)?.getCellOptions().isSolid) {
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
        map.getItems().forEach((newItem: Item) => {
            let d = this.p5.dist(newItem.getX(), newItem.getY(), this.x, this.y);
            if (d < Map.CELL_SIZE) {                
                // Try to collect the item
                this.inventory.addItem(newItem);
            }
        });
        map.clearItemsPicked();
    }

    public resize(width: number, height: number): void {
        this.inventory.resize(width, height);
    }

    public draw(p5: p5): void {
        p5.fill(0, 200, 0);
        p5.stroke(0);
        p5.strokeWeight(1);
        
        p5.push();
        p5.translate(this.x, this.y)
        p5.ellipse(0, 0, Player.DIAMETER, Player.DIAMETER);

        let angle = 0;
        
        if (this.directionFacing.x !== 0) {
            angle = p5.atan(this.directionFacing.y / this.directionFacing.x);
        }
        else {
            angle = this.directionFacing.y > 0 ? p5.PI/2 : -p5.PI/2;
        }

        if (this.directionFacing.x < 0) angle += p5.PI;

        let deltaAngle = p5.PI / 9;

        p5.fill(0);
        p5.ellipse(Player.DIAMETER/2 * p5.cos(angle+deltaAngle), Player.DIAMETER/2 * p5.sin(angle+deltaAngle), Player.DIAMETER/5, Player.DIAMETER/5);
        p5.ellipse(Player.DIAMETER/2 * p5.cos(angle-deltaAngle), Player.DIAMETER/2 * p5.sin(angle-deltaAngle), Player.DIAMETER/5, Player.DIAMETER/5);

        p5.pop();

        this.inventory.draw(p5);
    }
}