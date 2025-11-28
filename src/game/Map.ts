import p5 from "p5";
import Cell from "./cell/Cell";
import Camera from "./Camera";
import Ground from "./cell/Ground";
import Wall from "./cell/Wall";
import type Item from "./item/Item";
import type Bullet from "./Bullet";
import type Zombie from "./entity/Zombie";
import type Player from "./entity/Player";

export class MapLists {
    public static getDefaultMap(): Cell[][] {
        return [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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

    private zombies: Zombie[] = [];
    private items: Item[] = [];
    private bullets: Bullet[] = [];

    constructor(cells: Cell[][]) {
        this.cells = cells;
    }

    public static parseCoordsToCell(x: number, y: number): { cellX: number; cellY: number } {
        const cellX = Math.floor(x / Map.CELL_SIZE);
        const cellY = Math.floor(y / Map.CELL_SIZE);
        return { cellX, cellY };
    }

    public getCell(x: number, y: number): Cell | null {
        const { cellX: cx, cellY: cy } = Map.parseCoordsToCell(x, y);

        if (cx < 0 || cy < 0 || cx >= this.cells.length || cy >= this.cells[0].length) {
            return null;
        }
        return this.cells[cx][cy];
    }

    public setCell(x: number, y: number, newCell: Cell): boolean {
        const { cellX: cx, cellY: cy } = Map.parseCoordsToCell(x, y);

        if (cx < 0 || cy < 0 || cx >= this.cells.length || cy >= this.cells[0].length) {
            return false;
        }
        this.cells[cx][cy] = newCell;

        return true;
    }

    public addZombies(...zombies: Zombie[]): void {
        this.zombies.push(...zombies);
    }

    public addItems(...items: Item[]): void {
        this.items.push(...items);
    }

    public addBullets(...bullets: Bullet[]): void {
        this.bullets.push(...bullets);
    }

    public getCells(): Cell[][] {
        return this.cells;
    }

    public getItems(): Item[] {
        return this.items;
    }

    public getZombies(): Zombie[] {
        return this.zombies;
    }

    public clearItemsPicked(): void {
        this.items = this.items.filter((item: Item) => !item.getIsPicked());
    }

    public clearBulletsKilled(): void {
        this.bullets = this.bullets.filter((bullet: Bullet) => bullet.getIsAlive());
    }

    public update(): void {
        for (const zombie of this.zombies) {
            zombie.move();
        }

        for (const bullet of this.bullets) {
            bullet.move(this);
        }
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

        // Draw zombie
        for (const zombie of this.zombies) {
            // Performance optimization (to refacto ?)
            if (zombie.getX() + Map.CELL_SIZE < camera.getOriginX() || zombie.getX() - Map.CELL_SIZE > camera.getOriginX() + p5.width / camera.getZoom()) continue;
            if (zombie.getY() + Map.CELL_SIZE < camera.getOriginY() || zombie.getY() - Map.CELL_SIZE > camera.getOriginY() + p5.height / camera.getZoom()) continue;

            zombie.draw(p5);
        }

        // Draw bullets
        for (const bullet of this.bullets) {
            // Performance optimization (to refacto ?)
            if (bullet.getX() + Map.CELL_SIZE < camera.getOriginX() || bullet.getX() - Map.CELL_SIZE > camera.getOriginX() + p5.width / camera.getZoom()) continue;
            if (bullet.getY() + Map.CELL_SIZE < camera.getOriginY() || bullet.getY() - Map.CELL_SIZE > camera.getOriginY() + p5.height / camera.getZoom()) continue;
            
            bullet.draw(p5);
        }
    }

    public drawMiniMap(p5: p5, x: number, y: number, width: number, height: number, player: Player): void {
        const mapWidth = this.cells.length * Map.CELL_SIZE;
        const mapHeight = this.cells[0].length * Map.CELL_SIZE;
        const scaleX = width / mapWidth;
        const scaleY = height / mapHeight;
        p5.push();
        p5.translate(x, y);
        p5.noStroke();
        // Draw cells
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[0].length; j++) {
                const cell = this.cells[i][j];
                if (cell instanceof Wall) {
                    p5.fill(100);
                } else {
                    p5.fill(200);
                }
                p5.rect(i * Map.CELL_SIZE * scaleX, j * Map.CELL_SIZE * scaleY, Map.CELL_SIZE * scaleX, Map.CELL_SIZE * scaleY);
            }
        }
        // Draw player
        p5.fill(0, 0, 255);
        p5.ellipse(player.getX() * scaleX, player.getY() * scaleY, 8, 8);
        // Draw zombies
        p5.fill(255, 0, 0);
        for (const zombie of this.zombies) {
            p5.ellipse(zombie.getX() * scaleX, zombie.getY() * scaleY, 6, 6);
        }
        p5.pop();
    }
}