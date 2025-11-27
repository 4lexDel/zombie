import Item from "./Item";

export default class Weapon extends Item {
    protected damage: number;
    protected range: number;
    protected shotFrequency: number;    // Shots per second

    protected lastShotTime: number | null;

    constructor(name: string, damage: number, range: number, shotFrequency: number, x: number = 0, y: number = 0) {
        super(name, x, y);
        this.damage = damage;
        this.range = range;
        this.shotFrequency = shotFrequency;

        this.itemOptions.isStackable = false;
        this.lastShotTime = null;
    }
}