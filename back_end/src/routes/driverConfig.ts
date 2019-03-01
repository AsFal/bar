import { apply } from "../polyfill/functional";
import { Database } from "../mongo/wrappers/IngredientDatabase";
import { IngredientDriver } from "../services/drivers/ingredient";

interface Module<T> {
    [key: string]: (...args: any) => T;
}