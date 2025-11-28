import p5 from "p5";
import sketch from "./sketch";

let p5Instance: p5 = new p5(sketch);

const newGameButton = document.getElementById("new-game-button");
const resumeButton = document.getElementById("resume-button");
const mapEditorButton = document.getElementById("map-editor-button");

const modal = document.getElementById("modal");
const modalBg = document.getElementById("modal-bg");


if (newGameButton && resumeButton && modal && modalBg && mapEditorButton) {
    const resumeGame = () => {
        modal.style.display = "none";
        modalBg.style.display = "none";
        p5Instance.loop();
    }

    const pauseGame = () => {
        modal.style.display = "flex";
        modalBg.style.display = "block";
        resumeButton.style.display = "inline-block";

        newGameButton.classList.remove("animate-button");

        p5Instance.noLoop();
    }

    newGameButton.addEventListener("click", () => {
        modal.style.display = "none";
        modalBg.style.display = "none";
        resumeButton.style.display = "inline-block";

        p5Instance.remove();
        p5Instance = new p5((p: p5) => {
            // initialize the sketch to register its lifecycle methods
            sketch(p);
            // wrap setup so that loop is started after setup finishes
            const originalSetup = (p as any).setup;
            (p as any).setup = function () {
                if (originalSetup) {
                    originalSetup.apply(this, arguments);
                }
                p.loop();
            };
        });
    });

    resumeButton.addEventListener("click", () => {
        resumeGame();
    });

    mapEditorButton.addEventListener("click", () => {
        window.location.href = "/map-editor.html";
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (modal.style.display === "flex" && resumeButton.style.display === "inline-block") {                
                resumeGame();
            }
            else {
                pauseGame();
            }
        }
    });
}