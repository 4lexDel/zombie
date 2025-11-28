import p5 from "p5";
import { initColors } from "./colors";
import Scene from "./game/Scene";

function showFps(p: p5) {
  const fpsMeasured = p.frameRate();
  let fps = `${(fpsMeasured > 60 ? 60 : fpsMeasured).toPrecision(2)} fps`;
    p.textSize(30);
    p.fill(0);
    p.noStroke();
    p.textAlign(p.LEFT, p.TOP)
    p.text(fps, 10, 10)
}

const sketch = (p: p5) => {
  let scene: Scene;

  let drawImplementation: () => void;

  p.setup = () => {
    p.frameRate(30);

    p.createCanvas(p.windowWidth, p.windowHeight);

    // Set color variables
    initColors(p);

    // Initialize the scene
    scene = new Scene(p);
    scene.resize(p.windowWidth, p.windowHeight);

    drawImplementation = () => {
      p.background(255, 254, 240);
      scene.draw();

      showFps(p);
    };

    drawImplementation();

    p.noLoop();
  };

  p.draw = () => {
    // if (!gameState.isRunning) return;
    drawImplementation();
  };

  p.windowResized = () => {    
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background(220);

    scene.resize(p.windowWidth, p.windowHeight);
  };
};

export default sketch;