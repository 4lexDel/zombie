import p5 from "p5";
import Map, { MapLists } from "./Map";
import Player from "./Player";
import Camera from "./Camera";
import Gun from "./item/Gun";
import Box from "./item/Box";

export default class Scene {
    private p5: p5;

    private camera: Camera;

    private player: Player;
    private map: Map;

    constructor(p5: p5) {
        this.p5 = p5;
        this.map = new Map(MapLists.getDefaultMap());
        this.map.addItem(new Gun(11.5 * Map.CELL_SIZE, 10.5 * Map.CELL_SIZE));
        this.map.addItem(new Gun(15.5 * Map.CELL_SIZE, 12.5 * Map.CELL_SIZE));
        this.map.addItem(new Box(15.5 * Map.CELL_SIZE, 10.5 * Map.CELL_SIZE));

        this.player = new Player(p5, this.map.getCells().length/2 * Map.CELL_SIZE, this.map.getCells()[0].length/2 * Map.CELL_SIZE);
        
        this.camera = new Camera(this.p5, this.player, 2);
    }

    public resize(width: number, height: number): void {
        this.player.resize(width, height);
    }

    public draw(): void {
        // Update player controls
        this.player.UpdateControls(this.map);

        this.p5.push();
        this.p5.scale(this.camera.getZoom(), this.camera.getZoom());        

        this.p5.translate(-this.camera.getOriginX(), -this.camera.getOriginY());

        // Draw scene
        this.map.draw(this.p5, this.camera);
        this.player.draw(this.p5);
        
        this.p5.pop();
        
    }
}