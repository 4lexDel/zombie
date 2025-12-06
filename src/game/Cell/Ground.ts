import { COLORS } from "../../colors";
import Map from "../Map";
import Cell from "./Cell";

export default class Ground extends Cell {
    constructor(x: number = 0, y: number = 0, dx: number = Map.CELL_SIZE, dy: number = Map.CELL_SIZE) {
        super(x, y, dx, dy, { isSolid: false, color: COLORS.lightGrey });
        this.id = 0;
    }
}