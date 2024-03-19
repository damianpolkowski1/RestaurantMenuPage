"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCartSummary = exports.displayProductsInCart = exports.renderDishesInMenu = exports.displayNavigationBar = void 0;
var index_1 = require("./index");
var api_utils_1 = require("./api-utils");
var uuid_1 = require("uuid");
function displayNavigationBar(id) {
    var ul = document.createElement("ul");
    ul.setAttribute("class", "toolbar-list");
    var navbar_content = [
        { link: "./index.html", name: "Start" },
        { link: "./menu.html", name: "Menu" },
        { link: "./about-us.html", name: "About Us" },
        { link: "./cart.html", name: "Cart" },
    ];
    var _loop_1 = function (i) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("href", navbar_content[i].link);
        var a_text = void 0;
        if (i !== 3) {
            a_text = document.createTextNode(navbar_content[i].name);
        }
        else {
            var summed_items_1 = 0;
            index_1.items_in_cart.forEach(function (element) {
                summed_items_1 += element[1];
            });
            if (summed_items_1 !== 0)
                a_text = document.createTextNode(navbar_content[i].name + " (".concat(summed_items_1, " Items)"));
            else
                a_text = document.createTextNode(navbar_content[i].name);
        }
        a.appendChild(a_text);
        li.appendChild(a);
        ul.appendChild(li);
    };
    for (var i = 0; i < navbar_content.length; i++) {
        _loop_1(i);
    }
    var element = document.getElementById(id);
    if (element) {
        element.appendChild(ul);
    }
}
exports.displayNavigationBar = displayNavigationBar;
function renderDishesInMenu(cart) {
    return __awaiter(this, void 0, void 0, function () {
        var dishes_list;
        return __generator(this, function (_a) {
            dishes_list = [];
            (0, api_utils_1.getDishesData)().then(function (data) {
                dishes_list = data;
                for (var i = 0; i < dishes_list.length; i++) {
                    var newDish = document.createElement("li");
                    var dishName = dishes_list[i].name;
                    var dishPrice = dishes_list[i].price;
                    var pictureLink = dishes_list[i].picture_link;
                    var image = document.createElement("img");
                    image.src = pictureLink;
                    var addToCartDiv = document.createElement("div");
                    addToCartDiv.classList.add("add-to-cart-button");
                    var header = document.createElement("h4");
                    var header_text = document.createTextNode("".concat(dishName, " (").concat(dishPrice, " RSD)"));
                    header.appendChild(header_text);
                    var button = document.createElement("button");
                    button.setAttribute("type", "button");
                    button.setAttribute("class", "menu_button");
                    button.setAttribute("id", dishes_list[i].id);
                    button.textContent = "Add to Cart";
                    addToCartDiv.appendChild(image);
                    addToCartDiv.appendChild(header);
                    addToCartDiv.appendChild(button);
                    newDish.appendChild(addToCartDiv);
                    var element = document.getElementById("menu-list");
                    if (element) {
                        element.appendChild(newDish);
                    }
                }
                listenToMenuButtonsEvent(cart);
            });
            return [2 /*return*/];
        });
    });
}
exports.renderDishesInMenu = renderDishesInMenu;
function listenToMenuButtonsEvent(cart) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            (0, api_utils_1.getDishesData)().then(function (data) {
                data.forEach(function (element) {
                    var button = document.getElementById(element.id);
                    if (button) {
                        button.addEventListener("click", function () {
                            if (cart.hasOwnProperty(element.id)) {
                                cart[element.id] += 1;
                            }
                            else {
                                cart[element.id] = 1;
                            }
                            localStorage.setItem("cart", JSON.stringify(cart));
                            location.reload();
                        });
                    }
                });
            });
            return [2 /*return*/];
        });
    });
}
function displayProductsInCart(productId, cart) {
    return __awaiter(this, void 0, void 0, function () {
        var dish_to_display;
        return __generator(this, function (_a) {
            (0, api_utils_1.getSpecificDish)(productId).then(function (data) {
                dish_to_display = data;
                var newDish = document.createElement("li");
                var dishName = dish_to_display.name;
                var dishPrice = dish_to_display.price;
                var quantity = cart[productId];
                var header = document.createElement("h4");
                var header_text = document.createTextNode("".concat(dishName, ": ").concat(quantity, " --- ").concat(dishPrice * quantity, " RSD"));
                header.appendChild(header_text);
                var increaseId = (0, uuid_1.v4)();
                var decreaseId = (0, uuid_1.v4)();
                var increaseButton = document.createElement("button");
                increaseButton.setAttribute("type", "button");
                increaseButton.setAttribute("class", "increase-cart-button");
                increaseButton.setAttribute("id", increaseId);
                increaseButton.textContent = "+";
                (0, api_utils_1.getDishesData)().then(function (data) {
                    var decreaseButton = document.createElement("button");
                    decreaseButton.setAttribute("type", "button");
                    decreaseButton.setAttribute("class", "decrease-cart-button");
                    decreaseButton.setAttribute("id", decreaseId);
                    decreaseButton.textContent = "-";
                    newDish.appendChild(header);
                    newDish.appendChild(increaseButton);
                    newDish.appendChild(decreaseButton);
                    var element = document.getElementById("cart-items");
                    if (element)
                        element.appendChild(newDish);
                    var increase_button = document.getElementById(increaseId);
                    var decrease_button = document.getElementById(decreaseId);
                    if (increase_button) {
                        increase_button.addEventListener("click", function () {
                            cart[productId] += 1;
                            localStorage.setItem("cart", JSON.stringify(cart));
                            location.reload();
                        });
                    }
                    if (decrease_button) {
                        decrease_button.addEventListener("click", function () {
                            if (cart[productId] > 0)
                                cart[productId] -= 1;
                            console.log(cart);
                            if (cart[productId] === 0)
                                delete cart[productId];
                            console.log(cart);
                            localStorage.setItem("cart", JSON.stringify(cart));
                            location.reload();
                        });
                    }
                });
            });
            return [2 /*return*/];
        });
    });
}
exports.displayProductsInCart = displayProductsInCart;
function generateCartSummary(total_amount) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (total_amount) {
                (0, api_utils_1.getDishesData)().then(function (data) {
                    var dishes_list = data;
                    console.log(dishes_list);
                    var sum = 0;
                    index_1.items_in_cart.forEach(function (element) {
                        var dish_to_calculate = dishes_list.find(function (e) { return e.id === element[0]; });
                        if (dish_to_calculate)
                            sum += element[1] * dish_to_calculate.price; //quantity * price
                    });
                    if (sum !== 0) {
                        var summary = document.createElement("h3");
                        var summary_content = document.createTextNode("Total: ".concat(sum, " RSD"));
                        summary.appendChild(summary_content);
                        var payment_button = document.createElement("button");
                        var button_text = document.createTextNode("Proceed to Payment");
                        payment_button.appendChild(button_text);
                        total_amount.appendChild(summary);
                        total_amount.appendChild(payment_button);
                    }
                    else {
                        var summary = document.createElement("h2");
                        var summary_content = document.createTextNode("Your cart is empty!");
                        summary.style.paddingBottom = "30vh";
                        summary.style.width = "100%";
                        summary.appendChild(summary_content);
                        total_amount.appendChild(summary);
                    }
                });
            }
            return [2 /*return*/];
        });
    });
}
exports.generateCartSummary = generateCartSummary;
