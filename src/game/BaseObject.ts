export default class BaseObject {
    protected x: number;
    protected y: number;

    protected identifier: symbol;

    constructor(x: number = -1, y: number = -1) {
        this.x = x;
        this.y = y;

        this.identifier = Symbol();
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
}