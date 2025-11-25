import Item from "./Item";

export default class Weapon extends Item {
    protected damage: number;
    protected range: number;

    constructor(name: string, damage: number, range: number, x: number = 0, y: number = 0) {
        super(name, x, y);
        this.damage = damage;
        this.range = range;

        this.itemOptions.isStackable = false;
    }
}