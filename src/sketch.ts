import p5 from "p5";
import { initColors } from "./colors";
import Scene from "./game/Scene";

const sketch = (p: p5) => {
  let scene: Scene;

  p.setup = () => {
    p.frameRate(60);

    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(220);
    
    // Set color variables
    initColors(p);

    // Initialize the scene
    scene = new Scene(p);
    scene.resize(p.windowWidth, p.windowHeight);
  };

  p.draw = () => {
    p.clear();
    p.background(255, 254, 240);
    scene.draw();
  };

  p.windowResized = () => {    
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background(220);

    scene.resize(p.windowWidth, p.windowHeight);
  };
};

new p5(sketch);