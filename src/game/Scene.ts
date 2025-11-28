import p5 from "p5";
import Map, { MapLists } from "./Map";
import Player from "./entity/Player";
import Camera from "./Camera";
import Gun from "./item/Gun";
import Box from "./item/Box";
import Zombie from "./entity/Zombie";
import Pathfinder from "./Pathfinder";

export default class Scene {
    private p5: p5;

    private camera: Camera;

    private player: Player;
    private map: Map;
    private pathfinder: Pathfinder;

    private zombies: Zombie[] = [];

    constructor(p5: p5) {
        this.p5 = p5;
        this.map = new Map(MapLists.getDefaultMap());
        this.map.addItems(new Gun(11.5 * Map.CELL_SIZE, 10.5 * Map.CELL_SIZE));
        this.map.addItems(new Gun(17.5 * Map.CELL_SIZE, 13.5 * Map.CELL_SIZE));
        this.map.addItems(new Box(17.5 * Map.CELL_SIZE, 10.5 * Map.CELL_SIZE));

        this.player = new Player(this.map, this.map.getCells().length/2 * Map.CELL_SIZE, this.map.getCells()[0].length/2 * Map.CELL_SIZE);

        this.pathfinder = new Pathfinder(this.map, this.player);

        this.zombies = [
            new Zombie(5.5 * Map.CELL_SIZE, 5.5 * Map.CELL_SIZE),
            new Zombie(18.5 * Map.CELL_SIZE, 8.5 * Map.CELL_SIZE),
            new Zombie(10.5 * Map.CELL_SIZE, 15.5 * Map.CELL_SIZE),
            new Zombie(20.5 * Map.CELL_SIZE, 14.5 * Map.CELL_SIZE),
            new Zombie(7.5 * Map.CELL_SIZE, 18.5 * Map.CELL_SIZE),
            new Zombie(3.5 * Map.CELL_SIZE, 12.5 * Map.CELL_SIZE),
            new Zombie(16.5 * Map.CELL_SIZE, 4.5 * Map.CELL_SIZE),
            new Zombie(12.5 * Map.CELL_SIZE, 3.5 * Map.CELL_SIZE),
            new Zombie(19.5 * Map.CELL_SIZE, 17.5 * Map.CELL_SIZE),
        ];

        this.zombies.forEach((zombie: Zombie) => {
            this.pathfinder.subscribeEntity(zombie);
        });

        this.map.addZombies(...this.zombies);
        
        this.camera = new Camera(this.p5, this.player, 1);
    }
    
    public resize(width: number, height: number): void {
        this.player.resize(width, height);
    }
    
    public draw(): void {
        // Update player controls
        this.player.updateControls(this.p5);

        // Refresh pathfinder (every 10 frames)
        if (this.p5.frameCount % 10 === 0) this.pathfinder.refreshPaths();

        this.p5.push();

        // Zoom
        this.p5.scale(this.camera.getZoom(), this.camera.getZoom());        
        // X/Y translation
        this.p5.translate(-this.camera.getOriginX(), -this.camera.getOriginY());

        // Draw scene
        this.map.draw(this.p5, this.camera);

        // DEBUG PATHFINDER
        // this.pathfinder.drawCostPaths(this.p5);
        this.player.draw(this.p5);

        // Draw the mini map
        this.map.drawMiniMap(this.p5, this.p5.width - 110, 10, 100, 100, this.player);

        
        this.p5.pop();
        
    }
}