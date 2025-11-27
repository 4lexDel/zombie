import p5 from 'p5';
import BaseObject from "./BaseObject";
import Map from './Map';
import { COLORS } from '../colors';
import Entity from './entity/Entity';

export type BulletOptions = { 
    speed: number,
    lifeTime: number,   // Ms use with creationTime to kill the bullet
    damage: number,
    fragmentQuantityMin: number,    // Nb of bullet shoot (min)
    fragmentQuantityMax: number,
    deviationAngleMax: number          // The bullet(s) can be deviated based on this value
};

export default class Bullet extends BaseObject {
    public static GUN_BULLET: BulletOptions = { 
        speed: 20,
        lifeTime: 1500,
        damage: 3,
        fragmentQuantityMin: 1,
        fragmentQuantityMax: 1,
        deviationAngleMax: 0 //Straight shot
    }

    private creationTime: number;

    private originEntity: Entity;
    private startAngle; 
    private bulletOptions: BulletOptions;

    private isAlive = true;

    constructor(originEntity: Entity, x: number, y: number, startAngle:number, bulletOptions: BulletOptions) {
        super(x, y)
        this.originEntity = originEntity;
        this.creationTime = Date.now();
        this.startAngle = startAngle;
        this.bulletOptions = bulletOptions;

        this.diameter = 10;
    }

    public getIsAlive(): boolean {
        return this.isAlive;
    }

    public destroy(map: Map): void {
        this.isAlive = false;
        map.clearBulletsKilled();
    }

    public move(map: Map): void {
        if (Date.now() - this.creationTime >= this.bulletOptions.lifeTime) {
            this.destroy(map);
            return;
        }

        const newX = this.x + Math.cos(this.startAngle) * this.bulletOptions.speed;
        const newY = this.y + Math.sin(this.startAngle) * this.bulletOptions.speed;

        const cell = map.getCell(newX, newY);
        if (!cell || cell.getCellOptions().isSolid) {
            this.destroy(map);
            return;
        }

        const zombies = map.getZombies();
        for (let i = 0; i < zombies.length; i++) {
            if (this.isCollidingWith(zombies[i])) {
                
                // APPLY THE DAMAGE HERE!!! <--------------------
                this.destroy(map);
                return;
            }
        }

        this.x = newX;
        this.y = newY;
    }

    public draw(p: p5) {        
        p.fill(COLORS.orange.value);
        p.noStroke();
        p.ellipse(this.x, this.y, this.diameter, this.diameter);
    }
}