/**
 * Main file of the whole project
 */
import p5 from "p5";
import { initColors } from "./colors";
import Scene from "./game/Scene";
import Menu from "./game/Menu";

export type GameState = { isRunning: boolean, editMode: boolean };

class Sketch {
  private p5Instance?: p5;

  private menu: Menu;

  private gameState: GameState = {
    isRunning: false,
    editMode: false
  }

  private scene!: Scene;

  constructor() {
    this.menu = new Menu(this);
    this.initP5Instance();

    this.menu.onSaveButtonClicked = async () => {
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
        await writable.write(`CONTENT`);
        // PROVIDE THE SERIALIZATION CONTENT

        // Stream close
        await writable.close();
      } catch (err) {
        console.error("Save cancelled or failed:", err);
      }
    }

    this.menu.onLoadButtonClicked = () => {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "*/*"; // optional
      input.onchange = (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        console.log("Selected file:", file);

        // MANAGE THE LOAD LOGIC
      };
      input.click();
    }
  }

  public getGameState(): GameState {
    return this.gameState;
  }

  public setEditMode(state: boolean): void {
    this.gameState.editMode = state;
  }

  public setIsRunning(state: boolean): void {
    this.gameState.isRunning = state;
  }

  public initP5Instance(callback?: (() => void) | null): void {
    this.p5Instance?.remove();
    this.p5Instance = new p5((p: p5) => {
      let drawImplementation: (displayOnly?: boolean) => void;

      p.setup = () => {
        p.frameRate(30);

        p.createCanvas(p.windowWidth, p.windowHeight);

        // Set color variables
        initColors(p);

        // Initialize the scene
        this.scene = new Scene(p, this.gameState);
        this.scene.resize(p.windowWidth, p.windowHeight);

        drawImplementation = (displayOnly = false) => {
          p.background(255, 254, 240);

          !displayOnly && this.scene.update();
          this.scene.draw();

          this.showFps(p);

          callback && callback();
        };

        drawImplementation();
      };

      p.draw = () => {
        if (!this.gameState.isRunning) return;
        drawImplementation();
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.background(220);

        this.scene.resize(p.windowWidth, p.windowHeight);
        drawImplementation(true);
      };
    });
  }

  private showFps(p: p5) {
    const fpsMeasured = p.frameRate();
    let fps = `${(fpsMeasured > 60 ? 60 : fpsMeasured).toPrecision(2)} fps`;
    p.textSize(30);
    p.fill(0);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP)
    p.text(fps, 10, 10)
  }
}

export default Sketch;