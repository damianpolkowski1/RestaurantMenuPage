"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dish = exports.dishes = void 0;
var Dish = /** @class */ (function () {
    function Dish(name, price, picture_link) {
        this.name = name;
        this.price = price;
        this.picture_link = picture_link;
    }
    return Dish;
}());
exports.Dish = Dish;
var dishes = [];
exports.dishes = dishes;
