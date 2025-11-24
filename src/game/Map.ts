import p5 from "p5";
import Cell from "./Cell/Cell";
import Camera from "./Camera";
import Ground from "./Cell/Ground";
import Wall from "./Cell/Wall";

export class MapLists {
    public static getDefaultMap(): Cell[][] {
        return [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ].map((row, x) =>
            row.map((cellType, y) => {
                if (cellType === 0) {
                    return new Ground(x, y, Map.CELL_SIZE, Map.CELL_SIZE);
                } else {
                    return new Wall(x, y, Map.CELL_SIZE, Map.CELL_SIZE);
                }
            })
        );
    }
}

export default class Map {
    public static CELL_SIZE: number = 50;
    
    private cells: Cell[][];

    constructor(cells: Cell[][]) {
        this.cells = cells;
    }

    public getCell(x: number, y: number): Cell | null {
        let cx = Math.floor(x / Map.CELL_SIZE);
        let cy = Math.floor(y / Map.CELL_SIZE);

        if (cx < 0 || cy < 0 || cx >= this.cells.length || cy >= this.cells[0].length) {
            return null;
        }
        return this.cells[cx][cy];
    }

    // public setCell(x: number, y: number, cell: Cell): void {
    //     if (x >= 0 && y >= 0 && x < this.cells.length && y < this.cells[0].length) {
    //         this.cells[x][y] = cell;
    //     }
    // }

    public getCells(): Cell[][] {
        return this.cells;
    }

    public draw(p5: p5, camera: Camera): void {
        for (let x = 0; x < this.cells.length; x++) {
            for (let y = 0; y < this.cells[0].length; y++) {
                const cell = this.cells[x][y];
                cell.draw(p5, camera);
            }
        }
    }
}