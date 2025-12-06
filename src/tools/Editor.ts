import p5 from "p5";
import type Scene from "../game/Scene";
import Utils from "./Utils";
import Ground from "../game/cell/Ground";
import BoxCell from "../game/cell/Box";
import Wall from "../game/cell/Wall";
import BoxItem from "../game/item/Box";
import Gun from "../game/item/Gun";
import Zombie from "../game/entity/Zombie";
import Map from "../game/Map";

export interface SaveData {
    global: {
        zoom: number;
        cell_size: number;
    };
    player: {
        x: number;
        y: number;
        inventory: (null | { item: string; quantity: number })[];
    };
    map: {
        cells: number[][];
        items: { name: string; x: number; y: number }[];
        zombies: { x: number; y: number }[];
    };
}

export type EditMode = "Cell" | "Item" | "Entity" | null;

export default class Editor {
    private p5: p5;
    private scene: Scene;
    private editMode: EditMode = null;
    private elementSelected: string | null = null;

    constructor(p5: p5, scene: Scene) {
        this.p5 = p5;
        this.scene = scene;
        this.initEventsListener();
    }

    public setScene(scene: Scene): void {
        this.scene = scene;
    }

    private initEventsListener(): void {
        const elements = document.querySelectorAll(".element");

        const unselectElements = () => elements.forEach(element => element.classList.remove("selected"));

        // Element selection
        elements.forEach(element => {
            element.addEventListener("click", () => {
                unselectElements();
                element.classList.add("selected");

                // check if the direct parents has the class: "item-elements"
                const parent = element.parentElement;
                if (parent) {
                    if (parent.classList.contains("item-elements")) {
                        this.editMode = "Item";
                    }
                    else if (parent.classList.contains("cell-elements")) {
                        this.editMode = "Cell";
                    }
                    else if (parent.classList.contains("entity-elements")) {
                        this.editMode = "Entity";
                    }
                }

                const elementContent = element.querySelector('div');
                this.elementSelected = elementContent ? elementContent.id : null;
            });
        });

        document.querySelector("canvas")?.addEventListener("click", () => {
            const camera = this.scene.getCamera();

            const mx = this.p5.mouseX + camera.getOriginX();
            const my = this.p5.mouseY + camera.getOriginY();            

            switch(this.editMode) {
                case "Cell":
                    this.handleCellAdding(mx, my);
                    break;
                case "Item":
                    this.handleItemAdding(mx, my);
                    break;
                case "Entity":
                    this.handleEntityAdding(mx, my);
                    break;
            }
        });
    }

    private handleCellAdding(mx: number, my: number): void {        
        const map = this.scene.getMap();
        const { cellX, cellY } = Map.parseCoordsToCell(mx, my);

        switch(this.elementSelected?.toLowerCase()) {
            case "ground":
                map.setCell(mx, my, new Ground(cellX, cellY));
                break;
            case "box-cell":
                map.setCell(mx, my, new BoxCell(cellX, cellY));
                break;
            case "wall":
                map.setCell(mx, my, new Wall(cellX, cellY));
                break;
        }
    }

    private handleItemAdding(mx: number, my: number): void {
        const map = this.scene.getMap();

        switch(this.elementSelected?.toLowerCase()) {
            case "box-item":
                map.addItems(new BoxItem(mx, my));
                break;
            case "gun":
                map.addItems(new Gun(mx, my));
                break;
        }
    }

    private handleEntityAdding(mx: number, my: number): void {
        const map = this.scene.getMap();

        switch(this.elementSelected?.toLowerCase()) {
            case "zombie":
                map.addZombies(new Zombie(mx, my));
                break;
            case "player":
                const player = this.scene.getPlayer();
                player.setX(mx);
                player.setY(my);
                break;
        }
    }

    public getEditMode(): EditMode {
        return this.editMode;
    }

    /**
     * Method to save the current scene into a json file
     */
    public async save(): Promise<void> {
        try {
            // Open a save dialog
            const handle = await (window as any).showSaveFilePicker({
                suggestedName: "custom-level.json",
                types: [
                    {
                        description: "JSON file",
                        accept: { "text/json": [".json"] }
                    }
                ]
            });

            // Stream open
            const writable = await handle.createWritable();

            // Write the file contents
            await writable.write(this.parseSceneToString());

            // Stream close
            await writable.close();
        } catch (err) {
            console.error("Save cancelled or failed:", err);
        }
    }

    public parseSceneToString(): string {
        const player = this.scene.getPlayer();
        const slots = player.getInventory().getSlots();
        const map = this.scene.getMap();

        const saveData = {
            global: { zoom: 2, cell_size: 50 },
            player: {
                x: player.getX(),
                y: player.getY(),
                inventory: slots.map(slot =>
                    slot ? { item: slot.item.getName(), quantity: slot.quantity } : null
                )
            },
            map: {
                cells: map.getCells().map(row => row.map(cell => cell.getId())),
                items: map.getItems().map(item => ({
                    name: item.getName(),
                    x: item.getX(),
                    y: item.getY()
                })),
                zombies: map.getZombies().map(z => ({ x: z.getX(), y: z.getY() }))
            }
        };

        return Utils.prettyStringify(saveData, 4);
    }

    /**
     * Load a json file and return a saveData object
     */
    public load(): Promise<SaveData | null> {
        return new Promise((res) => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "text/json"; // optional
    
            input.onchange = async (event) => {
                const file = (event.target as HTMLInputElement).files?.[0];
                if (!file) return null;
    
                const text = await file.text();
    
                const saveDataLoaded = this.parseStringToSaveData(text);
                console.log(saveDataLoaded);
                res(saveDataLoaded);    
            };
    
            input.click();
        });
    }

    public parseStringToSaveData(jsonString: string): SaveData {
        let parsed: any;

        try {
            parsed = JSON.parse(jsonString);
        } catch (err) {
            throw new Error("Invalid JSON: " + err);
        }

        // Validators
        const isNumber = (v: any) => typeof v === "number" && !isNaN(v);
        const isString = (v: any) => typeof v === "string";
        const isArray = (v: any) => Array.isArray(v);
        const isObject = (v: any) => typeof v === "object" && v !== null;

        if (!isObject(parsed)) throw new Error("Invalid format: root must be an object");
        if (!isObject(parsed.global)) throw new Error("Missing global");
        if (!isObject(parsed.player)) throw new Error("Missing player");
        if (!isObject(parsed.map)) throw new Error("Missing map");

        if (!isNumber(parsed.global.zoom)) throw new Error("Invalid global.zoom");
        if (!isNumber(parsed.global.cell_size)) throw new Error("Invalid global.cell_size");

        if (!isNumber(parsed.player.x)) throw new Error("Invalid player.x");
        if (!isNumber(parsed.player.y)) throw new Error("Invalid player.y");
        if (!isArray(parsed.player.inventory)) throw new Error("Invalid inventory");

        const inventory = parsed.player.inventory.map((slot: any) => {
            if (slot === null) return null;
            if (!isObject(slot)) throw new Error("Invalid inventory slot");
            if (!isString(slot.item)) throw new Error("Invalid slot.item");
            if (!isNumber(slot.quantity)) throw new Error("Invalid slot.quantity");
            return { item: slot.item, quantity: slot.quantity };
        });

        if (!isArray(parsed.map.cells)) throw new Error("Invalid cells");
        const cells = parsed.map.cells.map((row: any) => {
            if (!isArray(row)) throw new Error("Invalid cell row");
            return row.map((id: any) => {
                if (!isNumber(id)) throw new Error("Cell ID must be number");
                return id;
            });
        });

        if (!isArray(parsed.map.items)) throw new Error("Invalid items");
        const items = parsed.map.items.map((it: any) => {
            if (!isObject(it)) throw new Error("Invalid item");
            if (!isString(it.name)) throw new Error("Invalid item.name");
            if (!isNumber(it.x) || !isNumber(it.y))
                throw new Error("Invalid item coordinates");
            return { name: it.name, x: it.x, y: it.y };
        });

        if (!isArray(parsed.map.zombies)) throw new Error("Invalid zombies");
        const zombies = parsed.map.zombies.map((z: any) => {
            if (!isObject(z)) throw new Error("Invalid zombie");
            if (!isNumber(z.x) || !isNumber(z.y))
                throw new Error("Invalid zombie coords");
            return { x: z.x, y: z.y };
        });

        // SaveData object
        const result: SaveData = {
            global: {
                zoom: parsed.global.zoom,
                cell_size: parsed.global.cell_size
            },
            player: {
                x: parsed.player.x,
                y: parsed.player.y,
                inventory
            },
            map: {
                cells,
                items,
                zombies
            }
        };

        return result;
    }
}