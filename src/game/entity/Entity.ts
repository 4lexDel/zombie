import p5 from "p5";
import BaseObject from "../BaseObject";
import { COLORS, type ColorOption } from "../../colors";
import Map from "../Map";

export default class Entity extends BaseObject {
    protected diameter: number = 30;

    protected speed: number = 6;

    protected directionFacing = { x: 1, y: 0 };

    protected color: ColorOption;

    // Variable used to store paths provided by the pathfinding algorithm if the entity has subscribed to it
    protected paths: { nextX: number; nextY: number, cost: number }[][] = [];

    // Nexpoint in the path to follow
    protected interestPoint: { x: number; y: number } | null = null;

    constructor(x: number = 0, y: number = 0) {
        super(x, y);

        this.color = COLORS.blue;
    }

    // Method called by the pathfinding system to set the paths for this entity
    public setPaths(paths: { nextX: number; nextY: number, cost: number }[][]): void {
        this.paths = paths;
        this.interestPoint = this.getNextInterestPoint();
    }

    private getNextInterestPoint(): { x: number; y: number } | null {
        let cellX = Map.parseCoordsToCell(this.x, this.y).cellX;
        let cellY = Map.parseCoordsToCell(this.x, this.y).cellY;

        if (cellX < 0 || cellY < 0 || cellX >= this.paths.length || cellY >= this.paths[0].length) {
            return null;
        }

        const path = this.paths[cellX][cellY];
        if (!path || (path.nextX === -1 && path.nextY === -1)) {
            return null;
        }

        return { x: path.nextX * Map.CELL_SIZE + Map.CELL_SIZE / 2, y: path.nextY * Map.CELL_SIZE + Map.CELL_SIZE / 2 };
    }

    public move(): void {
        if (!this.interestPoint) {
            this.interestPoint = this.getNextInterestPoint();
            if (!this.interestPoint) {
                return;
            }
        }

        const dirX = this.interestPoint.x - this.x;
        const dirY = this.interestPoint.y - this.y;
        const len = Math.hypot(dirX, dirY);
        this.directionFacing = { x: dirX / len, y: dirY / len };

        const moveX = (dirX / len) * this.speed;
        const moveY = (dirY / len) * this.speed;
        this.x += moveX;
        this.y += moveY;

        // If close enough to the interest point, clear it
        if (Math.hypot(this.x - this.interestPoint.x, this.y - this.interestPoint.y) < this.speed) {
            this.interestPoint = null;
        }
    }

    public draw(p: p5): void {
        p.fill(this.color.value);
        p.stroke(0);
        p.strokeWeight(1);
        
        p.push();
        p.translate(this.x, this.y)
        p.ellipse(0, 0, this.diameter, this.diameter);

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
        p.ellipse(this.diameter/2 * p.cos(angle+deltaAngle), this.diameter/2 * p.sin(angle+deltaAngle), this.diameter/5, this.diameter/5);
        p.ellipse(this.diameter/2 * p.cos(angle-deltaAngle), this.diameter/2 * p.sin(angle-deltaAngle), this.diameter/5, this.diameter/5);

        p.pop();
    }
}