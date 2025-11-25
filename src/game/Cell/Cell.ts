import p5 from "p5";
import BaseObject from "../BaseObject";
import { COLORS, type ColorOption } from "../../colors";
import Item from "../item/Item";

export class CellOptions {
    public isSolid: boolean = false;
    public color: ColorOption = COLORS.lightGrey;
}

export default class Cell extends BaseObject {    
    protected dx: number;
    protected dy: number;

    protected cellOptions: CellOptions = new CellOptions();

    protected itemUsed: Item | null = null;

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

    public draw(p5: p5): void {
        p5.fill(this.cellOptions.color.value);
        p5.stroke(0);
        p5.strokeWeight(2);
        p5.rect(
            this.x * this.dx,
            this.y * this.dy,
            this.dx,
            this.dy,
            3
        );
    }
}