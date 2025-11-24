import p5 from "p5";

export class EventHandler {
    private static eventHandler: EventHandler;
    private p!: p5;

    private mousePressedCallbacks: Map<symbol, { priority: number, action: () => void}> = new Map();
    private mouseDraggedCallbacks: Map<symbol, { priority: number, action: () => void}> = new Map();
    private mouseReleasedCallbacks: Map<symbol, { priority: number, action: () => void}> = new Map();
    private mouseMovedCallbacks: Map<symbol, { priority: number, action: () => void}> = new Map();

    private priorityLimiter: number = 0;

    constructor(p: p5) {
        // First init
        if (!EventHandler.eventHandler) {
            this.p = p; 
            EventHandler.eventHandler = this;
            this.initEvents();
        }
        return EventHandler.eventHandler;
    }

    public static getInstance(p: p5): EventHandler {
        if (!EventHandler.eventHandler) {
            EventHandler.eventHandler = new EventHandler(p);
        }
        return EventHandler.eventHandler;
    }

    public addEventMousePressed(symbol: symbol, callback: () => void, priority: number = 0) {
        this.mousePressedCallbacks.set(symbol, { priority, action: callback});
    }

    public addEventMouseDragged(symbol: symbol, callback: () => void, priority: number = 0) {
        this.mouseDraggedCallbacks.set(symbol, { priority, action: callback});
    }

    public addEventMouseReleased(symbol: symbol, callback: () => void, priority: number = 0) {
        this.mouseReleasedCallbacks.set(symbol, { priority, action: callback});
    }

    public addEventMouseMoved(symbol: symbol, callback: () => void, priority: number = 0) {
        this.mouseMovedCallbacks.set(symbol, { priority, action: callback});
    }

    public removeEventMousePressed(symbol: symbol) {
        this.mousePressedCallbacks.delete(symbol);
    }

    public removeEventMouseReleased(symbol: symbol) {
        this.mouseReleasedCallbacks.delete(symbol);
    }

    public removeEventMouseDragged(symbol: symbol) {
        this.mouseDraggedCallbacks.delete(symbol);
    }

    public removeEventMouseMoved(symbol: symbol) {
        this.mouseMovedCallbacks.delete(symbol);
    }

    public setPriorityLimiter(priority: number) {
        this.priorityLimiter = priority;

        // Refresh event condition
        this.initEvents();
    }

    private initEvents() {
        this.p.mousePressed = () => {
            this.mousePressedCallbacks.forEach(callback => callback.priority >= this.priorityLimiter && callback.action());
        };
        this.p.mouseDragged = () => {
            this.mouseDraggedCallbacks.forEach(callback => callback.priority >= this.priorityLimiter && callback.action());
        };
        this.p.mouseReleased = () => {
            this.mouseReleasedCallbacks.forEach(callback => callback.priority >= this.priorityLimiter && callback.action());
        };
        this.p.mouseMoved = () => {
            this.mouseMovedCallbacks.forEach(callback => callback.priority >= this.priorityLimiter && callback.action());
        };
    }
}

// TODO: add a level priority to prevent any event from a modal