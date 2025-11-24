import p5 from "p5";
import BaseObject from "../BaseObject";
import Camera from "../Camera";

export default class Item extends BaseObject {
    protected name: string;

    protected isPicked: boolean = false;

    protected creationTime: number;

    constructor(name: string, x: number = 0, y: number = 0) {
        super(x, y);
        this.name = name;

        this.creationTime = Date.now();
    }

    public getName(): string {
        return this.name;
    }

    public draw(_: p5, __: Camera): void {
        throw new Error("Method not implemented.");
    }
}