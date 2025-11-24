import p5 from "p5";
import type { HorizontalAlign, VerticalAlign } from "../../containers/BaseContainer";
import { EventHandler } from "../../EventHandler";

export class BaseModal {
    protected static padding: number = 10;

    protected p: p5;

    protected x!: number;
    protected y!: number;

    protected identifier: symbol;

    protected width!: number;
    protected height!: number;

    protected isVisible: boolean = false;

    protected horizontalAlign: HorizontalAlign = "LEFT";
    protected verticalAlign: VerticalAlign = "TOP";

    protected eventHandler: EventHandler;

    constructor(p: p5, horizontalAlign: HorizontalAlign = "LEFT", verticalAlign: VerticalAlign = "TOP") {
        this.p = p;

        this.identifier = Symbol("Modal");

        this.horizontalAlign = horizontalAlign;
        this.verticalAlign = verticalAlign;

        this.eventHandler = EventHandler.getInstance(p);

        this.initEvents();
    }

    protected clearEvents() {
        this.eventHandler.removeEventMousePressed(this.identifier);
    }

    protected initEvents() {
        this.clearEvents();

        this.eventHandler.addEventMousePressed(this.identifier, () => {
            if (!this.isVisible) return;

            let coords = this.getCoordsOrigin();

            if (
                this.p.mouseX < coords.x || this.p.mouseX > coords.x + this.width ||
                this.p.mouseY < coords.y || this.p.mouseY > coords.y + this.height
            ) {
                this.close();
            }
        }, 1);
    }

    public open(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width; 
        this.height = height;

        this.isVisible = true;
        this.initEvents();
        this.eventHandler.setPriorityLimiter(1);
    }

    public close() {        
        this.isVisible = false;
        this.eventHandler.setPriorityLimiter(0);

        this.clearEvents();
    }

    protected getCoordsOrigin() {
        let x = this.x;
        let y = this.y;

        if (this.horizontalAlign === "CENTER") x -= this.width/2;
        else if (this.horizontalAlign === "LEFT") x -= this.width;

        if (this.verticalAlign === "CENTER") y -= this.height/2;
        if (this.verticalAlign === "TOP") y -= this.height;

        return { x, y }
    }

    public draw() {
        if (this.isVisible) {
            
            this.p.strokeWeight(2);
            this.p.stroke(200);
            this.p.fill(120);

            let coords = this.getCoordsOrigin();

            this.p.rect(coords.x, coords.y, this.width, this.height);
        }
    }
}