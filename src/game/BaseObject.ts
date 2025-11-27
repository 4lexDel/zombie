import Map from "./Map";

export default class BaseObject {
    protected x: number;
    protected y: number;

    protected identifier: symbol;

    protected diameter: number = Map.CELL_SIZE;

    constructor(x: number = -1, y: number = -1) {
        this.x = x;
        this.y = y;

        this.identifier = Symbol();
    }

    public getDiameter(): number {
        return this.diameter;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public setX(x: number): void {
        this.x = x;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public isCollidingWith(baseObject: BaseObject): boolean {
        const d  = Math.sqrt(Math.pow(this.x - baseObject.getX(), 2) + Math.pow(this.y - baseObject.getY(), 2));
        return d <= ((baseObject.getDiameter()/2) + (this.diameter/2));
    }
}