import p5 from "p5";
import Entity from "./Entity";
import { COLORS } from "../../colors";

export default class Zombie extends Entity {       
    constructor(x: number = 0, y: number = 0) {
        super(x, y);

        this.diameter = 40;
        this.speed = 4;
        this.color = COLORS.red;
    }

    public draw(p: p5): void {
        super.draw(p);
    }
}