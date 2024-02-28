let dish_names = ['Pljeskavica', 'Pierogi', 'Żurek', 'Rizotto',
                'Rosół', 'Bigos', 'Cevapi', 'Sernik', 'Szarlotka'];

let dish_prices = [660, 720, 530, 580, 410, 650, 700, 360, 380];

let dish_pictures_links = ["./assets/pljeskavica.png",
                            "./assets/pierogi.png",
                            "./assets/zurek.png",
                            "./assets/rizoto.png",
                            "./assets/rosol.png",
                            "./assets/bigos.png",
                            "./assets/cevapi.png",
                            "./assets/sernik.png",
                            "./assets/szarlotka.png"];

for(let i = 0; i < dish_names.length; i++)
{
    let newDish = document.createElement("li");

    let dishName = dish_names[i];
    let dishPrice = dish_prices[i];
    let pictureLink = dish_pictures_links[i];

    let image = document.createElement("img");
    image.src = pictureLink;

    let addToCartDiv = document.createElement("div");
    addToCartDiv.classList.add("add-to-cart-button");

    let header = document.createElement("h4");
    let header_text = document.createTextNode(`${dishName} (${dishPrice} RSD)`);
    header.appendChild(header_text);

    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("id", i);
    button.textContent = "Add to Cart";

    addToCartDiv.appendChild(header);
    addToCartDiv.appendChild(button);

    newDish.appendChild(image);
    newDish.appendChild(addToCartDiv);

    const element = document.getElementById("menu-list");

    if (element) {
        element.appendChild(newDish);
    }
}

let cart = JSON.parse(localStorage.getItem('cart')) || {};

for(let i = 0; i < dish_names.length; i++)
{
    let button = document.getElementById(i);

    if(button)
    {
        button.addEventListener("click", function()
        {
            if(cart.hasOwnProperty(i))
            {
                cart[i] += 1;
            }
            else
            {
                cart[i] = 1;
            }
    
            localStorage.setItem('cart', JSON.stringify(cart));
        });
    }
}

for(let i = 0; i < dish_names.length; i++)
{
    if(cart.hasOwnProperty(i))
    {
        displayProductsInCart(i);
    }
}

function displayProductsInCart (productId) {
    let newDish = document.createElement("li");

    let dishName = dish_names[productId];
    let dishPrice = dish_prices[productId];
    let quantity = cart[productId];

    let header = document.createElement("h4");
    let header_text = document.createTextNode(`${dishName}: ${quantity} --- ${dishPrice*quantity} RSD`);
    header.appendChild(header_text);

    let increaseButton = document.createElement("button");
    increaseButton.setAttribute("type", "button");
    increaseButton.setAttribute("class", "increase-cart-button");
    increaseButton.setAttribute("id", productId);
    increaseButton.textContent = "+";

    let decreaseButton = document.createElement("button");
    decreaseButton.setAttribute("type", "button");
    decreaseButton.setAttribute("class", "decrease-cart-button");
    decreaseButton.setAttribute("id", productId);
    decreaseButton.textContent = "-";

    newDish.appendChild(header);
    newDish.appendChild(increaseButton);
    newDish.appendChild(decreaseButton);

    const element = document.getElementById("cart-items");

    if(element) element.appendChild(newDish);
}