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
}