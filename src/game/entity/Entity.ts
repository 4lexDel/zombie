import p5 from "p5";
import BaseObject from "../BaseObject";
import { COLORS, type ColorOption } from "../../colors";

export default class Entity extends BaseObject {
    protected diameter: number = 30;

    protected speed: number = 6;

    protected directionFacing = { x: 1, y: 0 };

    protected color: ColorOption;

    // Variable used to store paths provided by the pathfinding algorithm if the entity has subscribed to it
    protected paths: { nextX: number; nextY: number, cost: number }[][] = [];

    constructor(x: number = 0, y: number = 0) {
        super(x, y);

        this.color = COLORS.blue;
    }

    // Method called by the pathfinding system to set the paths for this entity
    public setPaths(paths: { nextX: number; nextY: number, cost: number }[][]): void {
        this.paths = paths;
        // console.log(paths);
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