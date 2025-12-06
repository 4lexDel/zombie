import { COLORS } from "../../colors";
import Map from "../Map";
import Cell from "./Cell";

export default class Box extends Cell {
    constructor(x: number = 0, y: number = 0, dx: number = Map.CELL_SIZE, dy: number = Map.CELL_SIZE) {
        super(x, y, dx, dy, { isSolid: true, color: COLORS.brown });
        this.id = 2;
    }
}