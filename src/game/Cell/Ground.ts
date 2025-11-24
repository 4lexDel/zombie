import { COLORS } from "../../colors";
import Cell from "./Cell";

export default class Ground extends Cell {
    constructor(x: number = 0, y: number = 0, dx: number = 50, dy: number = 50) {
        super(x, y, dx, dy, { isSolid: false, color: COLORS.lightGrey });
    }
}