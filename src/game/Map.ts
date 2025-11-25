import p5 from "p5";
import Cell from "./cell/Cell";
import Camera from "./Camera";
import Ground from "./cell/Ground";
import Wall from "./cell/Wall";
import type Item from "./item/Item";

export class MapLists {
    public static getDefaultMap(): Cell[][] {
        return [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    private items: Item[] = [];

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

    public addItem(item: Item): void {
        this.items.push(item);
    }

    public getCells(): Cell[][] {
        return this.cells;
    }

    public getItems(): Item[] {
        return this.items;
    }

    public clearItemsPicked(): void {
        this.items = this.items.filter((item: Item) => !item.getIsPicked());
    }

    public draw(p5: p5, camera: Camera): void {
        // Draw cells
        for (let x = 0; x < this.cells.length; x++) {
            for (let y = 0; y < this.cells[0].length; y++) {
                // Performance optimization (to refacto ?)                
                if ((x+1) * Map.CELL_SIZE < camera.getOriginX() || x * Map.CELL_SIZE > camera.getOriginX() + p5.width / camera.getZoom()) continue;
                if ((y+1) * Map.CELL_SIZE < camera.getOriginY() || y * Map.CELL_SIZE > camera.getOriginY() + p5.height / camera.getZoom()) continue;
                
                const cell = this.cells[x][y];
                cell.draw(p5);
            }
        }

        // Draw items
        for (const item of this.items) {
            // Performance optimization (to refacto ?)
            if (item.getX() + Map.CELL_SIZE < camera.getOriginX() || item.getX() - Map.CELL_SIZE > camera.getOriginX() + p5.width / camera.getZoom()) continue;
            if (item.getY() + Map.CELL_SIZE < camera.getOriginY() || item.getY() - Map.CELL_SIZE > camera.getOriginY() + p5.height / camera.getZoom()) continue;

            item.draw(p5);
        }
    }
}