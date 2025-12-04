import p5 from "p5";
import type BaseObject from "./BaseObject";
import type { GameState } from "../sketch";

export default class Camera {
    private p5: p5;

    private gameState: GameState;

    private zoom: number;
    private focusObject: BaseObject;

    // Used for map dragging
    private mouseDraggingSensibility = 0.3;

    private offsetX = 0;
    private offsetY = 0;

    constructor(p5: p5, gameState: GameState, focusObject: BaseObject, zoom: number = 1) {
        this.p5 = p5;
        this.gameState = gameState;
        this.focusObject = focusObject;
        this.zoom = zoom;

        this.initEvents();
    }

    private initEvents(): void {
        this.p5.mouseDragged = () => {
            if (!this.gameState.editMode) return;           
            
            this.offsetX -= (this.p5.mouseX - this.p5.pmouseX) * this.mouseDraggingSensibility;
            this.offsetY -= (this.p5.mouseY - this.p5.pmouseY) * this.mouseDraggingSensibility;
        }
    }

    public getZoom(): number {
        return this.zoom;
    }

    public getOriginX(): number {
        let originX = this.focusObject.getX() - (1 / this.zoom) * (this.p5.windowWidth / 2);
        if (!this.gameState.editMode) {
            return originX
        }
        
        return originX + this.offsetX;
    }

    public getOriginY(): number {
        let originY = this.focusObject.getY() - (1 / this.zoom) * (this.p5.windowHeight / 2);
        if (!this.gameState.editMode) {
            return originY
        }
        return originY + this.offsetY;
    }
}