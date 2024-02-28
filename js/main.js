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
    element.appendChild(newDish);
}

let cart = {};

for(let i = 0; i < dish_names.length; i++)
{
    let button = document.getElementById(i);

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

        //alert(`${dish_names[i]}: ${cart[i]}`);
    });
}