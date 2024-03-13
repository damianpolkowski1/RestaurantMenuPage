import { items_in_cart } from "./index";
import { getDishesData, getSpecificDish, getDishesLength } from "./api-utils";
import { Dish } from "./data";

interface Cart {
    [key: string]: number;
}

function returnPageBeingDisplayed():string {
    let currentPath:string = window.location.pathname;

    let pageName = currentPath.substring(currentPath.lastIndexOf("/") + 1, currentPath.lastIndexOf("."));
    return pageName;
}

export function displayNavigationBar(id: string) {
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

export async function renderDishesInMenu(cart: Cart)
{
    let dishes_list: Dish[] = []

    getDishesData('http://localhost:2137/dish')
    .then((data) => {
        dishes_list = data;

        for(let i = 0; i < dishes_list.length; i++)
        {
            let newDish = document.createElement("li");
            
            let dishName = dishes_list[i].name;
            let dishPrice = dishes_list[i].price;
            let pictureLink = dishes_list[i].picture_link;

            let image = document.createElement("img");
            image.src = pictureLink;

            let addToCartDiv = document.createElement("div");
            addToCartDiv.classList.add("add-to-cart-button");

            let header = document.createElement("h4");
            let header_text = document.createTextNode(`${dishName} (${dishPrice} RSD)`);
            header.appendChild(header_text);

            let button = document.createElement("button");
            button.setAttribute("type", "button");
            button.setAttribute("class", "menu_button");
            button.setAttribute("id", String(i));
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

        listenToMenuButtonsEvent(cart);
    })
}

async function listenToMenuButtonsEvent(cart: Cart)
{
    getDishesLength('http://localhost:2137/dish/number')
    .then((data) => {
        for(let i = 0; i < data; i++)
        {
            let button = document.getElementById(String(i));

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
                    location.reload();
                });
            }
        }
    })
}

export async function displayProductsInCart (productId: number, cart: Cart) {
    let dish_to_display: Dish;

    getSpecificDish(String(productId))
    .then((data) => {
        dish_to_display = data;
    
        let newDish = document.createElement("li");

        let dishName = dish_to_display.name;
        let dishPrice = dish_to_display.price;
        let quantity = cart[productId];

        let header = document.createElement("h4");
        let header_text = document.createTextNode(`${dishName}: ${quantity} --- ${dishPrice*quantity} RSD`);
        header.appendChild(header_text);

        let increaseButton = document.createElement("button");
        increaseButton.setAttribute("type", "button");
        increaseButton.setAttribute("class", "increase-cart-button");
        increaseButton.setAttribute("id", String(productId));
        increaseButton.textContent = "+";

        getDishesLength('http://localhost:2137/dish/number')
        .then((data) => {
            let dishes_length: number = data;
            let decreaseButton = document.createElement("button");
            decreaseButton.setAttribute("type", "button");
            decreaseButton.setAttribute("class", "decrease-cart-button");
            decreaseButton.setAttribute("id", String(productId + dishes_length));
            decreaseButton.textContent = "-";

            newDish.appendChild(header);
            newDish.appendChild(increaseButton);
            newDish.appendChild(decreaseButton);

            const element = document.getElementById("cart-items");

            if(element) element.appendChild(newDish);

            let increase_button = document.getElementById(String(productId));
            let decrease_button = document.getElementById(String(productId + dishes_length));

            if(increase_button)
            {
                increase_button.addEventListener("click", function()
                {
                    cart[String(productId)] += 1;
        
                    localStorage.setItem('cart', JSON.stringify(cart));
                    location.reload();
                });
            }

            if(decrease_button)
            {
                decrease_button.addEventListener("click", function()
                {
                    if(cart[String(productId)] > 0) cart[String(productId)] -= 1;
                    console.log(cart);

                    if(cart[String(productId)] === 0) delete cart[String(productId)];
                    console.log(cart);
        
                    localStorage.setItem('cart', JSON.stringify(cart));
                    location.reload();
                });
            }
        })
    })
}

export async function generateCartSummary(total_amount: HTMLElement | null)
{
    if(total_amount)
    {
        getDishesData('http://localhost:2137/dish')
        .then((data) => {
            let dishes_list: Dish[] = data;
            let sum = 0;

            items_in_cart.forEach(element => {
                sum += element[1] * dishes_list[Number(element[0])].price;
            })

            if(sum !== 0)
            {
                let summary = document.createElement("h3");
                let summary_content = document.createTextNode(`Total: ${sum} RSD`);
                summary.appendChild(summary_content);

                let payment_button = document.createElement("button");
                let button_text = document.createTextNode('Proceed to Payment');
                payment_button.appendChild(button_text);
                
                total_amount.appendChild(summary);
                total_amount.appendChild(payment_button);
            }
            else
            {
                let summary = document.createElement("h2");
                let summary_content = document.createTextNode('Your cart is empty!');
                summary.style.paddingBottom = '30vh';
                summary.style.width = '100%';
                summary.appendChild(summary_content);

                total_amount.appendChild(summary);
            }
        })
    }
}