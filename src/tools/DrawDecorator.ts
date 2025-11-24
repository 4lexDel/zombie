import { RendererSystem } from "./RendererSystem";

export function RegisterDraw(zIndex: number) {
    return function (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ): void {
        const originalMethod = descriptor.value as Function;

        descriptor.value = function (...args: any[]) {
            const rendererSystem = RendererSystem.getInstance();

            // Register method execution in RendererSystem
            rendererSystem.register(() => originalMethod.apply(this, args), zIndex);
        };
    };
}
