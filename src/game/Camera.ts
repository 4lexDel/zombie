import p5 from "p5";
import type BaseObject from "./BaseObject";

export default class Camera {
    private p5: p5;

    private zoom: number;
    private focusObject: BaseObject;

    private mode: string = "CENTER";

    constructor(p5: p5, focusObject: BaseObject, zoom: number = 1, mode: string = "CENTER") {
        this.p5 = p5;
        this.focusObject = focusObject;
        this.zoom = zoom;
        this.mode = mode;
    }

    public getZoom(): number {
        return this.zoom;
    }

    public getOriginX(): number {
        if (this.mode === "CENTER") {
            return this.focusObject.getX() - (1 / this.zoom) * (this.p5.windowWidth / 2);
        }
        return this.focusObject.getX();
    }

    public getOriginY(): number {
        if (this.mode === "CENTER") {
            return this.focusObject.getY() - (1 / this.zoom) * (this.p5.windowHeight / 2);
        }
        return this.focusObject.getY();
    }
}