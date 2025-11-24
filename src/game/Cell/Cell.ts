import p5 from "p5";
import BaseObject from "../BaseObject";
import Camera from "../Camera";
import { COLORS, type ColorOption } from "../../colors";
import Map from "../Map";

export class CellOptions {
    public isSolid: boolean = false;
    public color: ColorOption = COLORS.lightGrey;
}

export default class Cell extends BaseObject {    
    private dx: number;
    private dy: number;

    private cellOptions: CellOptions = new CellOptions();

    constructor(x: number, y: number, dx: number = 50, dy: number = 50, cellOptions?: CellOptions) {
        super(x, y);
        this.dx = dx;
        this.dy = dy;
        if (cellOptions) {
            this.cellOptions = cellOptions;
        }
    }

    public getCellOptions(): CellOptions {
        return this.cellOptions;
    }

    public draw(p5: p5, camera: Camera): void {
        p5.fill(this.cellOptions.color.value);
        p5.stroke(0);
        p5.strokeWeight(2);
        p5.rect(
            this.x * Map.CELL_SIZE - camera.getOriginX(),
            this.y * Map.CELL_SIZE - camera.getOriginY(),
            this.dx,
            this.dy,
            3
        );
    }
}