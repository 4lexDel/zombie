import p5 from "p5";
import BaseObject from "../BaseObject";
import type Inventory from "../Inventory";

export class ItemOptions {
    public isStackable: boolean = false;
}

export default class Item extends BaseObject {
    protected name: string;

    protected isPicked: boolean = false;
    
    protected itemOptions: ItemOptions = { isStackable: true };

    protected creationTime: number;

    constructor(name: string, x: number = 0, y: number = 0) {
        super(x, y);
        this.name = name;

        this.creationTime = Date.now();
    }

    public collect(inventory: Inventory) {
        this.isPicked = true;
        inventory.addItem(this);
    }

    public setIsPicked(picked: boolean): void {
        this.isPicked = picked;
    }

    public getName(): string {
        return this.name;
    }

    public getItemOptions(): ItemOptions {
        return this.itemOptions;
    }

    public getIsPicked(): boolean {
        return this.isPicked;
    }

    public draw(p5: p5): void {
        throw new Error("Method not implemented.");
    }

    public drawIcon(p5: p5, x: number, y: number, width: number, height: number): void {
        throw new Error("Method not implemented.");
    }
}