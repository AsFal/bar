import { IRessourceDatabase } from "./IRessourceDatabase";
import { IContainer } from "./IContainer";

export interface IContainerDatabase<T> extends IRessourceDatabase<T> {
    fetchPopulated(id: string): Promise<T>;
}