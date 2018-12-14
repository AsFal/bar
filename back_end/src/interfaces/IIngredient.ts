export interface IIngredient {
    rate: {
        cost: number,
        unitOfMeasure: String
      };
      name: String;
      type: String;
      abv: number;
      quantity: number;
}

export function instanceOfIIngredient(o: any): o is IIngredient {
    return "name" in o && "type" in o && "abv" in o && "quantity" in o;
}