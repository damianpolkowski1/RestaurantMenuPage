"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.items_in_cart = void 0;
require("./css/styles.css");
require("./css/about-us_styles.css");
require("./css/cart_styles.css");
require("./css/index_styles.css");
require("./css/menu_styles.css");
var utils_1 = require("./utils");
var Dish = /** @class */ (function () {
    function Dish(name, price, picture_link) {
        this.name = name;
        this.price = price;
        this.picture_link = picture_link;
    }
    return Dish;
}());
var cart;
var item = localStorage.getItem('cart');
if (item)
    cart = JSON.parse(item);
else
    cart = {};
var items_in_cart = Object.entries(cart).filter(function (_a) {
    var key = _a[0], value = _a[1];
    return value > 0;
});
exports.items_in_cart = items_in_cart;
(0, utils_1.displayNavigationBar)("toolbar");
(0, utils_1.renderDishesInMenu)(cart);
items_in_cart.forEach(function (element) {
    (0, utils_1.displayProductsInCart)(Number(element[0]), cart);
});
(0, utils_1.listenToCartButtonsEvent)(cart);
var total_amount = document.getElementById('total-amount');
(0, utils_1.generateCartSummary)(total_amount);
