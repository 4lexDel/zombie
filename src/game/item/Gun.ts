import p5 from "p5";
import Weapon from "./Weapon";
import type Entity from "../entity/Entity";
import type Map from "../Map";

export default class Gun extends Weapon {
    private width: number = 30;
    private height: number = 10;

    constructor(x: number = 0, y: number = 0) {
        super("Gun", 10, 2, x, y);
        this.radius = 20;
    }

    public use(originEntity: Entity, map: Map): boolean {       
        return false;
    }

    public draw(p5: p5): void {
        if (this.isPicked) return;

        p5.fill(150, 150, 150);
        p5.stroke(0);
        p5.strokeWeight(2);

        // derive an angle from creationDate (map timestamp into [0, TWO_PI], here over a 1-hour period)
        const delta = Date.now() - this.creationTime;
        const angle = (delta % 3600000) / 3600 * p5.TWO_PI;

        p5.push();
        // translate to the gun center, rotate, then draw the rectangle centered
        const cx = this.x;
        const cy = this.y;
        p5.translate(cx, cy);
        p5.rotate(angle);
        p5.rectMode(p5.CENTER);
        p5.rect(0, 0, this.width, this.height, 2);
        p5.pop();
    }

    public drawIcon(p5: p5, x: number, y: number, maxWidth: number, maxHeight: number): void {
        if (maxWidth <= 0 || maxHeight <= 0) return;

        // fit
        const scale = Math.min(maxWidth / this.width, maxHeight / this.height);
        const w = this.width * scale;
        const h = this.height * scale;

        const cx = x + maxWidth / 2;
        const cy = y + maxHeight / 2;

        p5.push();
        p5.fill(150, 150, 150);
        p5.stroke(0);
        p5.strokeWeight(2);
        p5.rectMode(p5.CENTER);
        p5.rect(cx, cy, w, h, Math.max(1, 2 * scale));
        p5.pop();
    }
}

