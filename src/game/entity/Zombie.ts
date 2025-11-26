import p5 from "p5";
import Entity from "./Entity";
import { COLORS } from "../../colors";
import Utils from "../../tools/Utils";

export default class Zombie extends Entity {       
    constructor(x: number = 0, y: number = 0) {
        super(x, y);

        this.diameter = 40;
        this.speed = Utils.getRandomNumber(1.5, 3.5);
        this.color = COLORS.red;
    }

    public draw(p: p5): void {
        super.draw(p);

        this.move();
    }
}