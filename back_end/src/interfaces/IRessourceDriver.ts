export interface IRessourceDriver<T> {
    create(ressourceInfo: T): Promise<T>;
    fetch(id: string): Promise<T>;
    destroy(id: string): Promise<T>;
    update(id: string, ressourceInfo: T): Promise<T>;
}
