import p5 from "p5";
import BaseObject from "./BaseObject";
import Camera from "./Camera";
import Map from "./Map";
import Inventory from "./Inventory";
import Gun from "./item/Gun";

export default class Player extends BaseObject {
    public static DIAMETER: number = 30;
    
    private p5: p5;
    
    private inventory: Inventory;

    private speed: number = 4;

    constructor(p5: p5, x: number = 0, y: number = 0) {
        super(x, y);

        this.p5 = p5;
        this.inventory = new Inventory();

        this.inventory.addItem(new Gun());
    }

    public UpdateControls(map: Map): void {
        if (!this.p5.keyIsPressed) {
            return;
        }
            
        let dx = 0;
        let dy = 0;

        if (this.p5.keyIsDown(this.p5.UP_ARROW)) {
            dy -= 1;
        }
        if (this.p5.keyIsDown(this.p5.DOWN_ARROW)) {
            dy += 1;
        }
        if (this.p5.keyIsDown(this.p5.LEFT_ARROW)) {
            dx -= 1;
        }
        if (this.p5.keyIsDown(this.p5.RIGHT_ARROW)) {
            dx += 1;
        }

        // No movement
        if (dx === 0 && dy === 0) {
            return;
        }

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

        // Apply movement on axes that are clear
        if (canMoveX) this.x = newX;
        if (canMoveY) this.y = newY;
    }

    public resize(width: number, height: number): void {
        this.inventory.resize(width, height);
    }

    public draw(p5: p5, camera: Camera): void {
        p5.fill(0, 200, 0);
        p5.stroke(0);
        p5.strokeWeight(1);
        p5.ellipse(this.x - camera.getOriginX(), this.y - camera.getOriginY(), Player.DIAMETER, Player.DIAMETER);

        this.inventory.draw(p5);
    }
}