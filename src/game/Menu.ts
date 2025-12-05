import type Sketch from "../sketch";

export default class Menu {
    // Sketch
    private sketch: Sketch;

    // Callback (use by the sketch)
    public onSaveButtonClicked?: () => void;
    public onLoadButtonClicked?: () => void;

    // Buttons
    private resumeButton = document.getElementById("resume-button");
    private newGameButton = document.getElementById("new-game-button");
    private levelEditorButton = document.getElementById("level-editor-button");
    private continueEditingButton = document.getElementById("continue-editing-button");
    private saveLevelButton = document.getElementById("save-level-button");
    private loadLevelButton = document.getElementById("load-level-button");
    private backHomeButton = document.getElementById("back-home-button");

    // Modal
    private modal = document.getElementById("modal");
    private modalBg = document.getElementById("modal-bg");

    // Drawer
    private drawer = document.getElementById("drawer");

    // Canvas
    private getCanvas = () => document.querySelector("canvas");

    constructor(sketch: Sketch) {
        this.sketch = sketch;

        this.initEventsListener();
    }

    private enableElement(element: HTMLElement | null): void {
        element && (element.style.display = "inline-block");
    }

    private diseableElement(element: HTMLElement | null): void {
        element && (element.style.display = "none");
        this.drawer?.classList.remove("side-reveal");
    }

    private hideModal(): void {
        this.diseableElement(this.modal);
        this.diseableElement(this.modalBg);
    }

    private displayModal(): void {
        this.modal && (this.modal.style.display = "flex");
        this.modalBg && (this.modalBg.style.display = "block");
    }

    private diseableAllButtons(): void {
        this.diseableElement(this.resumeButton);
        this.diseableElement(this.newGameButton);
        this.diseableElement(this.levelEditorButton);
        this.diseableElement(this.continueEditingButton);
        this.diseableElement(this.saveLevelButton);
        this.diseableElement(this.loadLevelButton);
        this.diseableElement(this.backHomeButton);
    }

    private enableHomeButtons(): void {
        this.diseableAllButtons();
        this.enableElement(this.newGameButton);
        this.enableElement(this.levelEditorButton);
    }

    private enableGameButtons(): void {
        this.diseableAllButtons();
        this.enableElement(this.resumeButton);
        this.enableElement(this.newGameButton);
        this.enableElement(this.backHomeButton);
    }

    private enableEditButtons(): void {
        this.diseableAllButtons();
        this.enableElement(this.continueEditingButton);
        this.enableElement(this.saveLevelButton);
        this.enableElement(this.loadLevelButton);
        this.enableElement(this.backHomeButton);
    }

    private resumeGame(): void {
        this.hideModal();
        this.sketch.setIsRunning(true);
        if (this.sketch.getGameState().editMode) {
            this.drawer?.classList.add("side-reveal");
        }
    }

    private pauseGame(): void {
        this.displayModal();
        this.drawer?.classList.remove("side-reveal");

        this.sketch.setIsRunning(false);
    }

    public initEventsListener(): void {
        // Default screen: home
        this.enableHomeButtons();

        this.newGameButton?.addEventListener("click", () => {
            this.enableGameButtons();
            this.hideModal();

            this.sketch.setEditMode(false);
            this.sketch.setIsRunning(true);
            this.sketch.initP5Instance(() => {
                const canvas = this.getCanvas();

                canvas && (canvas.style.cursor = "default");
            });
        });

        this.resumeButton?.addEventListener("click", () => {
            this.resumeGame();
        });

        this.continueEditingButton?.addEventListener("click", () => {
            this.resumeGame();
        });

        this.levelEditorButton?.addEventListener("click", () => {
            this.enableEditButtons();
            this.hideModal();

            this.sketch.setEditMode(true);
            this.sketch.setIsRunning(true);
            this.sketch.initP5Instance(() => {
                const canvas = this.getCanvas();

                canvas && (canvas.style.cursor = "crosshair");
            });
            this.drawer?.classList.add("side-reveal");
        });

        this.saveLevelButton?.addEventListener("click", () => {
            this.onSaveButtonClicked?.();
        });

        this.loadLevelButton?.addEventListener("click", () => {
            this.onLoadButtonClicked?.();
        });

        this.backHomeButton?.addEventListener("click", () => {
            this.enableHomeButtons();
        });

        window.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                if (this.modal?.style.display === "flex" && (this.resumeButton?.style.display === "inline-block" || this.continueEditingButton?.style.display == "inline-block")) {
                    this.resumeGame();
                }
                else {
                    this.pauseGame();
                }
            }
        });
    }
}