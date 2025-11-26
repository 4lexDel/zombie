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

    private zombies: any[] = [];

    constructor(p5: p5) {
        this.p5 = p5;
        this.map = new Map(MapLists.getDefaultMap());
        this.map.addItem(new Gun(11.5 * Map.CELL_SIZE, 10.5 * Map.CELL_SIZE));
        this.map.addItem(new Gun(15.5 * Map.CELL_SIZE, 12.5 * Map.CELL_SIZE));
        this.map.addItem(new Box(15.5 * Map.CELL_SIZE, 10.5 * Map.CELL_SIZE));

        this.player = new Player(this.map, this.map.getCells().length/2 * Map.CELL_SIZE, this.map.getCells()[0].length/2 * Map.CELL_SIZE);

        this.pathfinder = new Pathfinder(this.map, this.player);

        this.zombies = [
            new Zombie(5.5 * Map.CELL_SIZE, 5.5 * Map.CELL_SIZE),
            // new Zombie(18.5 * Map.CELL_SIZE, 8.5 * Map.CELL_SIZE),
            // new Zombie(10.5 * Map.CELL_SIZE, 15.5 * Map.CELL_SIZE),
        ];

        this.zombies.forEach((zombie: Zombie) => {
            this.pathfinder.subscribeEntity(zombie);
        });
        
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
        
        this.zombies.forEach((zombie: Zombie) => {
            zombie.draw(this.p5);
        });

        this.pathfinder.drawCostPaths(this.p5);
        this.player.draw(this.p5);
        
        this.p5.pop();
        
    }
}