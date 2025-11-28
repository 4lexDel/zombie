import p5 from "p5";
import type BaseObject from "./BaseObject";
import { gameState } from "../sketch";

export type CameraMode = "FOCUS" | "FREE";

export default class Camera {
    private p5: p5;

    private zoom: number;
    private focusObject: BaseObject;

    private mode: CameraMode = "FOCUS";


    // Used for map dragging
    private mouseDraggingSensibility = 0.3;

    private offsetX = 0;
    private offsetY = 0;

    constructor(p5: p5, focusObject: BaseObject, zoom: number = 1, mode: CameraMode = "FOCUS") {
        this.p5 = p5;
        this.focusObject = focusObject;
        this.zoom = zoom;
        this.mode = mode;

        this.initEvents();
    }

    private initEvents(): void {
        this.p5.mouseDragged = () => {
            if (!gameState.isRunning) return;
            
            
            this.offsetX -= (this.p5.mouseX - this.p5.pmouseX) * this.mouseDraggingSensibility;
            this.offsetY -= (this.p5.mouseY - this.p5.pmouseY) * this.mouseDraggingSensibility;
        }
    }

    public getZoom(): number {
        return this.zoom;
    }

    public getOriginX(): number {
        let originX = this.focusObject.getX() - (1 / this.zoom) * (this.p5.windowWidth / 2);
        if (this.mode === "FOCUS") {
            return originX
        }
        return originX + this.offsetX;
    }

    public getOriginY(): number {
        let originY = this.focusObject.getY() - (1 / this.zoom) * (this.p5.windowHeight / 2);
        if (this.mode === "FOCUS") {
            return originY
        }
        return originY + this.offsetY;
    }
}