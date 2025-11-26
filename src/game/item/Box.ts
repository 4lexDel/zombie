import p5 from "p5";
import Item from "./Item";
import { COLORS } from "../../colors";
import Entity from "../entity/Entity";
import Map from "../Map";
import BoxCell from "../cell/Box";

export default class Box extends Item {
    private size = 30;

    constructor(x: number = 0, y: number = 0) {
        super("Box", x, y);
        this.radius = 20;
    }

    public use(originEntity: Entity, map: Map): boolean {
        const entityAngleFacing = originEntity.getAngleFacing();

        const tx = originEntity.getX() + Math.cos(entityAngleFacing) * Map.CELL_SIZE;
        const ty = originEntity.getY() + Math.sin(entityAngleFacing) * Map.CELL_SIZE;

        const boxIndexCoords = Map.parseCoordsToCell(tx, ty);
        
        const cell = map.getCell(tx, ty);
        if (!cell || cell.getCellOptions().isSolid) return false;
        
        const success = map.setCell(tx, ty, new BoxCell(boxIndexCoords.cellX, boxIndexCoords.cellY, Map.CELL_SIZE, Map.CELL_SIZE));

        // The following bloc is used to avoid block glitch
        if (success) {
            const entityDirectionFacing = originEntity.getDirectionFacing();
            const entityIndexCoords = Map.parseCoordsToCell(
                originEntity.getX() + entityDirectionFacing.x * originEntity.getDiameter()/2,
                originEntity.getY() + entityDirectionFacing.y * originEntity.getDiameter()/2
            );
            
            // Are the entity and the box in the same spot ?
            if (entityIndexCoords.cellX === boxIndexCoords.cellX && entityIndexCoords.cellY === boxIndexCoords.cellY) {
                entityDirectionFacing.x && originEntity.setX((boxIndexCoords.cellX - entityDirectionFacing.x) * Map.CELL_SIZE + Map.CELL_SIZE/2);
                entityDirectionFacing.y && originEntity.setY((boxIndexCoords.cellY - entityDirectionFacing.y) * Map.CELL_SIZE + Map.CELL_SIZE/2);
            }
        }

        return success;
    }

    public draw(p5: p5): void {
        if (this.isPicked) return;

        p5.fill(COLORS.brown.value);
        p5.stroke(0);
        p5.strokeWeight(2);

        // derive an angle from creationDate (map timestamp into [0, TWO_PI], here over a 1-hour period)
        const delta = Date.now() - this.creationTime;
        const angle = (delta % 3600000) / 3600 * p5.TWO_PI;

        p5.push();
        // translate to the gun center, rotate, then draw the rectangle centered
        const cx = this.x;
        const cy = this.y;
        p5.translate(cx, cy);
        p5.rotate(angle);
        p5.rectMode(p5.CENTER);
        p5.rect(0, 0, this.size, this.size, 2);
        p5.pop();
    }

    public drawIcon(p5: p5, x: number, y: number, maxWidth: number, maxHeight: number): void {
        if (maxWidth <= 0 || maxHeight <= 0) return;

        // fit
        const scale = Math.min(maxWidth / this.size, maxHeight / this.size);
        const s = this.size * scale;

        const cx = x + maxWidth / 2;
        const cy = y + maxHeight / 2;

        p5.push();
        p5.fill(COLORS.brown.value);
        p5.stroke(0);
        p5.strokeWeight(2);
        p5.rectMode(p5.CENTER);
        p5.rect(cx, cy, s, s, Math.max(1, 2 * scale));
        p5.pop();
    }
}