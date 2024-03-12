import { getSpecificDish, getDishesData } from "./api-utils";

class Dish {
    name: string;
    price: number;
    picture_link: string;

    constructor(name: string, price: number, picture_link: string)
    {
      this.name = name;
      this.price = price;
      this.picture_link = picture_link;
    }
}

let dishes: Dish[] = [];

export {dishes, Dish};