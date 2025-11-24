import p5 from "p5";
import Weapon from "./Weapon";
import Camera from "../Camera";

export default class Gun extends Weapon {
    private width: number = 30;
    private height: number = 10;

    constructor(x: number = 0, y: number = 0) {
        super("Gun", 10, 2, x, y);
    }

    public draw(p5: p5, camera: Camera): void {
        p5.fill(150, 150, 150);
        p5.stroke(0);
        p5.strokeWeight(2);

        // derive an angle from creationDate (map timestamp into [0, TWO_PI], here over a 1-hour period)
        const delta = Date.now() - this.creationTime;
        const angle = (delta % 3600000) / 3600 * p5.TWO_PI;

        p5.push();
        // translate to the gun center, rotate, then draw the rectangle centered
        const cx = this.x - camera.getOriginX();
        const cy = this.y - camera.getOriginY();
        p5.translate(cx, cy);
        p5.rotate(angle);
        p5.rectMode(p5.CENTER);
        p5.rect(0, 0, this.width, this.height, 2);
        p5.pop();
    }
}

