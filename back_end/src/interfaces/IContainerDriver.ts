import { IRessourceDriver } from "./IRessourceDriver";

export interface IContainerDriver<T> extends IRessourceDriver<T> {
    addToContainer(containerId: string, ressourceId): Promise<T>;
    removeFromContainer(containerId: string, ressourceId): Promise<T>;
    clear(containerId): Promise<T>;
}