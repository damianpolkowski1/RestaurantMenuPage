export function displayNavigationBar(id, items_in_cart) {
    let ul = document.createElement("ul");
    ul.setAttribute("class", "toolbar-list");

    let navbar_content = [{link: "./index.html", name: "Start"},
                        {link: "./menu.html", name: "Menu"},
                        {link: "./about-us.html", name: "About Us"},
                        {link: "./cart.html", name: "Cart"}];

    for(let i = 0; i < navbar_content.length; i++)
    {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("href", navbar_content[i].link);

        let a_text;

        if(i !== 3)
        {
            a_text = document.createTextNode(navbar_content[i].name);
        }
        else
        {
            let summed_items = 0;

            items_in_cart.forEach(element => {
                summed_items += element[1];
            });

            if(summed_items !== 0) a_text = document.createTextNode(navbar_content[i].name + ` (${summed_items} Items)`);
            else a_text = document.createTextNode(navbar_content[i].name);
        }

        a.appendChild(a_text);
        li.appendChild(a);
        ul.appendChild(li);
    }

    const element = document.getElementById(id);

    if (element) {
        element.appendChild(ul);
    }
}

export function displayProductInCart (productId, dishes, cart) {
    let newDish = document.createElement("li");

    let dishName = dishes[productId].name;
    let dishPrice = dishes[productId].price;
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
    decreaseButton.setAttribute("id", (productId + dishes.length));
    decreaseButton.textContent = "-";

    newDish.appendChild(header);
    newDish.appendChild(increaseButton);
    newDish.appendChild(decreaseButton);

    const element = document.getElementById("cart-items");

    if(element) element.appendChild(newDish);
}

export function displayDishesInMenu(dishes)
{
    for(let i = 0; i < dishes.length; i++)
    {
        let newDish = document.createElement("li");

        let dishName = dishes[i].name;
        let dishPrice = dishes[i].price;
        let pictureLink = dishes[i].picture_link;

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

        addToCartDiv.appendChild(image);
        addToCartDiv.appendChild(header);
        addToCartDiv.appendChild(button);

        newDish.appendChild(addToCartDiv);

        const element = document.getElementById("menu-list");

        if (element) {
            element.appendChild(newDish);
        }
    }
}