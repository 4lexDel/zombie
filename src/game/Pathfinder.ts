import p5 from "p5";
import Entity from "./entity/Entity";
import Player from "./entity/Player";
import Map from "./Map";

type Node = { x: number; y: number; parent: Node | null, cost: number };

/**
 * Pathfinder based on the reverse Dijkstra's algorithm: from target to all reachable nodes (Entity).
 */
export default class Pathfinder {
    private map: Map;
    private target: Entity;

    /**
     * 2D array representing the path from each cell to the target.
     * Each cell contains the next cell's coordinates to move towards the target.
     * The end cell (target's cell) contains null values: { nextX: null, nextY: null }.         ===> TODO: UPDATE AT THE END OF THE DEV
     */
    private paths: { nextX: number; nextY: number, cost: number }[][] = [];

    private subscribedEntities: Set<Entity> = new Set();

    constructor(map: Map, target: Player) {
        this.map = map;
        this.target = target;
    }

    /**
     * Every time the target (player) moves, update the pathfinding for all subscribed entities (zombies).
     * @param entity
     */
    public subscribeEntity(entity: Entity): void {
        this.subscribedEntities.add(entity);
    }

    public unsubscribeEntity(entity: Entity): void {
        this.subscribedEntities.delete(entity);
    }

    public parseCoordsToCell(x: number, y: number): { cellX: number; cellY: number } {
        const cellX = Math.floor(x / Map.CELL_SIZE);
        const cellY = Math.floor(y / Map.CELL_SIZE);
        return { cellX, cellY };
    }

    public refreshPaths(): void {
        const cells = this.map.getCells();

        const openList: Node[] = [];
        const closedList: Node[] = [];

        let currentNode: Node;

        openList.push({
            x: Math.floor(this.target.getX() / Map.CELL_SIZE),
            y: Math.floor(this.target.getY() / Map.CELL_SIZE),
            parent: null,
            cost: 0
        });

        // =====================================> TODO: While every subcribed entity has not been processed
        while (openList.length > 0) {
            // Sort openList by cost (ascending)
            openList.sort((a, b) => a.cost - b.cost);
            currentNode = openList.shift() as Node;
            closedList.push(currentNode);

            // Get neighbors (diagonals allowed if no wall in between)
            const neighbors = [
                { x: 0, y: -1 },
                { x: 1, y: 0 },
                { x: 0, y: 1 },
                { x: -1, y: 0 },
                { x: -1, y: -1 },
                { x: 1, y: -1 },
                { x: 1, y: 1 },
                { x: -1, y: 1 },
            ];

            for (const neighborOffset of neighbors) {
                const neighborX = currentNode.x + neighborOffset.x;
                const neighborY = currentNode.y + neighborOffset.y;
                // Check bounds
                if (neighborX < 0 || neighborY < 0 || neighborX >= cells.length || neighborY >= cells[0].length) {
                    continue;
                }
                // Check if solid
                if (cells[neighborX][neighborY].getCellOptions().isSolid) {
                    continue;
                }
                // For diagonals, check if both adjacent cells are passable
                if ((neighborOffset.x !== 0 && neighborOffset.y !== 0)) {
                    const adjacentX = currentNode.x + neighborOffset.x;
                    const adjacentY = currentNode.y;
                    const adjacentX2 = currentNode.x;
                    const adjacentY2 = currentNode.y + neighborOffset.y;
                    
                    if (cells[adjacentX][adjacentY].getCellOptions().isSolid || 
                        cells[adjacentX2][adjacentY2].getCellOptions().isSolid) {
                        continue;
                    }
                }
                // Check if already in closedList
                if (closedList.find(node => node.x === neighborX && node.y === neighborY)) {
                    continue;
                }
                // Calculate cost (assuming uniform cost for now)
                const cost = currentNode.cost + 1;
                // Check if already in openList
                const existingNode = openList.find(node => node.x === neighborX && node.y === neighborY);
                if (existingNode) {
                    // Update cost if lower
                    if (cost < existingNode.cost) {
                        existingNode.cost = cost;
                        existingNode.parent = currentNode;
                    }
                } else {
                    openList.push({
                        x: neighborX,
                        y: neighborY,
                        parent: currentNode,
                        cost: cost
                    });
                }
            }
        }

        // Build paths 2D array
        this.paths = Array.from({ length: cells.length }, () =>
            Array.from({ length: cells[0].length }, () => ({ nextX: -1, nextY: -1, cost: -1 }))
        );

        for (const node of closedList) {
            if (node.parent) {
                this.paths[node.x][node.y] = { nextX: node.parent.x, nextY: node.parent.y, cost: node.cost };
            } else {
                this.paths[node.x][node.y] = { nextX: -1, nextY: -1, cost: node.cost }; // Target cell
            }
        }

        // Notify subscribed entities
        this.subscribedEntities.forEach((entity: Entity) => {
            entity.setPaths(this.paths);
        });
    }

    public drawCostPaths(p: p5): void {
        /**
         * For each cell, draw the cost to reach the target (number of steps).
         */
        p.fill(0);
        p.textAlign(p.RIGHT, p.BOTTOM);
        p.textSize(20);
        p.noStroke();
        for (let x = 0; x < this.paths.length; x++) {
            for (let y = 0; y < this.paths[0].length; y++) {
                const path = this.paths[x][y];
                p.text(path.cost.toString(), x * Map.CELL_SIZE + Map.CELL_SIZE / 2, y * Map.CELL_SIZE + Map.CELL_SIZE / 2);
            }
        }
    }
}