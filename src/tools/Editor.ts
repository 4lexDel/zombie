import type Scene from "../game/Scene";

export default class Editor {

    constructor() {}

    /**
     * Method to save the current scene into a json file
     * Content to save:
     * - Cells + Entities (player & zombies) + Items + bullets
     * @param scene 
     */
    public save(scene: Scene): void {
    }

    public load(): void {
    }
}