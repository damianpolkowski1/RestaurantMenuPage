var Dish = /** @class */ (function () {
    function Dish(name, price, picture_link) {
        this.name = name;
        this.price = price;
        this.picture_link = picture_link;
    }
    return Dish;
}());
var dishes = [new Dish('Pljeskavica', 660, './assets/pljeskavica.png'),
    new Dish('Pierogi', 720, './assets/pierogi.png'),
    new Dish('Żurek', 530, './assets/zurek.png'),
    new Dish('Rizotto', 580, './assets/rizoto.png'),
    new Dish('Rosół', 410, './assets/rosol.png'),
    new Dish('Bigos', 650, './assets/bigos.png'),
    new Dish('Cevapi', 700, './assets/cevapi.png'),
    new Dish('Sernik', 360, './assets/sernik.png'),
    new Dish('Szarlotka', 380, './assets/szarlotka.png'),
    new Dish('Kotlet Schabowy', 740, './assets/schabowy.png')];
function returnPageBeingDisplayed() {
    var currentPath = window.location.pathname;
    var pageName = currentPath.substring(currentPath.lastIndexOf("/") + 1, currentPath.lastIndexOf("."));
    return pageName;
}
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
displayNavigationBar("toolbar");
function displayNavigationBar(id) {
    var ul = document.createElement("ul");
    ul.setAttribute("class", "toolbar-list");
    var navbar_content = [{ link: "./index.html", name: "Start" },
        { link: "./menu.html", name: "Menu" },
        { link: "./about-us.html", name: "About Us" },
        { link: "./cart.html", name: "Cart" }];
    var _loop_2 = function (i) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("href", navbar_content[i].link);
        var a_text = void 0;
        if (i !== 3) {
            a_text = document.createTextNode(navbar_content[i].name);
        }
        else {
            var summed_items_1 = 0;
            items_in_cart.forEach(function (element) {
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
        _loop_2(i);
    }
    var element = document.getElementById(id);
    if (element) {
        element.appendChild(ul);
    }
}
for (var i = 0; i < dishes.length; i++) {
    var newDish = document.createElement("li");
    var dishName = dishes[i].name;
    var dishPrice = dishes[i].price;
    var pictureLink = dishes[i].picture_link;
    var image = document.createElement("img");
    image.src = pictureLink;
    var addToCartDiv = document.createElement("div");
    addToCartDiv.classList.add("add-to-cart-button");
    var header = document.createElement("h4");
    var header_text = document.createTextNode("".concat(dishName, " (").concat(dishPrice, " RSD)"));
    header.appendChild(header_text);
    var button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("id", String(i));
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
var _loop_1 = function (i) {
    var button = document.getElementById(String(i));
    if (button) {
        button.addEventListener("click", function () {
            if (cart.hasOwnProperty(i)) {
                cart[i] += 1;
            }
            else {
                cart[i] = 1;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload();
        });
    }
};
for (var i = 0; i < dishes.length; i++) {
    _loop_1(i);
}
items_in_cart.forEach(function (element) {
    displayProductInCart(element[0]);
});
function displayProductInCart(productId) {
    var newDish = document.createElement("li");
    var dishName = dishes[productId].name;
    var dishPrice = dishes[productId].price;
    var quantity = cart[productId];
    var header = document.createElement("h4");
    var header_text = document.createTextNode("".concat(dishName, ": ").concat(quantity, " --- ").concat(dishPrice * quantity, " RSD"));
    header.appendChild(header_text);
    var increaseButton = document.createElement("button");
    increaseButton.setAttribute("type", "button");
    increaseButton.setAttribute("class", "increase-cart-button");
    increaseButton.setAttribute("id", productId);
    increaseButton.textContent = "+";
    var decreaseButton = document.createElement("button");
    decreaseButton.setAttribute("type", "button");
    decreaseButton.setAttribute("class", "decrease-cart-button");
    decreaseButton.setAttribute("id", (productId + dishes.length));
    decreaseButton.textContent = "-";
    newDish.appendChild(header);
    newDish.appendChild(increaseButton);
    newDish.appendChild(decreaseButton);
    var element = document.getElementById("cart-items");
    if (element)
        element.appendChild(newDish);
}
if (returnPageBeingDisplayed() === 'cart') {
    items_in_cart.forEach(function (element) {
        var increase_button = document.getElementById(element[0]);
        if (increase_button) {
            increase_button.addEventListener("click", function () {
                cart[element[0]] += 1;
                localStorage.setItem('cart', JSON.stringify(cart));
                location.reload();
            });
        }
        var decrease_button = document.getElementById(element[0] + dishes.length);
        if (decrease_button) {
            decrease_button.addEventListener("click", function () {
                if (cart[element[0]] > 0)
                    cart[element[0]] -= 1;
                console.log(cart);
                if (cart[element[0]] === 0)
                    delete cart[element[0]];
                console.log(cart);
                localStorage.setItem('cart', JSON.stringify(cart));
                location.reload();
            });
        }
    });
}
var total_amount = document.getElementById('total-amount');
if (total_amount) {
    var sum_1 = 0;
    items_in_cart.forEach(function (element) {
        sum_1 += element[1] * dishes[element[0]].price;
    });
    if (sum_1 !== 0) {
        var summary = document.createElement("h3");
        var summary_content = document.createTextNode("Total: ".concat(sum_1, " RSD"));
        summary.appendChild(summary_content);
        var payment_button = document.createElement("button");
        var button_text = document.createTextNode('Proceed to Payment');
        payment_button.appendChild(button_text);
        total_amount.appendChild(summary);
        total_amount.appendChild(payment_button);
    }
    else {
        var summary = document.createElement("h2");
        var summary_content = document.createTextNode('Your cart is empty!');
        summary.style.paddingBottom = '30vh';
        summary.style.width = '100%';
        summary.appendChild(summary_content);
        total_amount.appendChild(summary);
    }
}
