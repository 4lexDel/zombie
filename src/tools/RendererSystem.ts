export class RendererSystem {
    private static rendererSystem: RendererSystem;
    private renderLogics: { callback: () => void; zIndex: number }[] = [];

    private constructor() {}

    public static getInstance(): RendererSystem {
        if (!RendererSystem.rendererSystem) {
            RendererSystem.rendererSystem = new RendererSystem();
        }
        return RendererSystem.rendererSystem;
    }

    public register(callback: () => void, zIndex: number): void {
        this.renderLogics.push({ callback, zIndex });
    }

    public render(): void {
        this.renderLogics
            .sort((a, b) => b.zIndex - a.zIndex)
            .forEach(logic => logic.callback());
        
        this.clear();
    }

    private clear(): void {
        this.renderLogics = [];
    }
}