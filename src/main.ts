import p5 from "p5";
import sketch, { gameState } from "./sketch";

let p5Instance: p5 = new p5(sketch);

// Buttons
const resumeButton = document.getElementById("resume-button");
const newGameButton = document.getElementById("new-game-button");
const levelEditorButton = document.getElementById("level-editor-button");
const continueEditingButton = document.getElementById("continue-editing-button");
const saveLevelButton = document.getElementById("save-level-button");
const loadLevelButton = document.getElementById("load-level-button");
const backHomeButton = document.getElementById("back-home-button");

// Modal
const modal = document.getElementById("modal");
const modalBg = document.getElementById("modal-bg");

// 

if (resumeButton && newGameButton && levelEditorButton && continueEditingButton && saveLevelButton && loadLevelButton && backHomeButton && modal && modalBg) {
    const diseableElement = (element: HTMLElement) => {
        element.style.display = "none";
    }

    const enableElement = (element: HTMLElement) => {
        element.style.display = "inline-block";
    }

    const hideModal = () => {
        diseableElement(modal);
        diseableElement(modalBg);
    }

    const displayModal = () => {
        modal.style.display = "flex";
        modalBg.style.display = "block";
    }

    const diseableAllButtons = () => {
        diseableElement(resumeButton);
        diseableElement(newGameButton);
        diseableElement(levelEditorButton);
        diseableElement(continueEditingButton);
        diseableElement(saveLevelButton);
        diseableElement(loadLevelButton);
        diseableElement(backHomeButton);
    }

    const enableHomeButtons = () => {
        diseableAllButtons();
        enableElement(newGameButton);
        enableElement(levelEditorButton);
    }

    const enableGameButtons = () => {
        diseableAllButtons();
        enableElement(resumeButton);
        enableElement(newGameButton);
        enableElement(backHomeButton);
    }

    const enableEditButtons = () => {
        diseableAllButtons();
        enableElement(continueEditingButton);
        enableElement(saveLevelButton);
        enableElement(loadLevelButton);
        enableElement(backHomeButton);
    }

    const resumeGame = () => {
        hideModal();
        gameState.isRunning = true;
    }

    const pauseGame = () => {
        displayModal();

        gameState.isRunning = false;
    }

    const restartGameInstance = (edit=false) => {
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
                gameState.editMode = edit;
                gameState.isRunning = true;
            };
        });
    }

    // Default screen: home
    enableHomeButtons();

    newGameButton.addEventListener("click", () => {
        enableGameButtons();
        hideModal();
        restartGameInstance(false);
        
    });

    resumeButton.addEventListener("click", () => {
        resumeGame();
    });

    continueEditingButton.addEventListener("click", () => {
        resumeGame();
    });

    levelEditorButton.addEventListener("click", () => {
        enableEditButtons();
        hideModal();
        restartGameInstance(true);
    });

    backHomeButton.addEventListener("click", () => {
        enableHomeButtons();
    })

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