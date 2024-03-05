class Dish {
    name: string;
    price: number;
    picture_link: string;

    constructor(name: string, price: number, picture_link: string) {
        this.name = name;
        this.price = price;
        this.picture_link = picture_link;
      }
}

let dishes = [new Dish('Pljeskavica', 660, './assets/pljeskavica.png'),
            new Dish('Pierogi', 720, './assets/pierogi.png'),
            new Dish('Żurek', 530, './assets/zurek.png'),
            new Dish('Rizotto', 580, './assets/rizoto.png'),
            new Dish('Rosół', 410, './assets/rosol.png'),
            new Dish('Bigos', 650, './assets/bigos.png'),
            new Dish('Cevapi', 700, './assets/cevapi.png'),
            new Dish('Sernik', 360, './assets/sernik.png'),
            new Dish('Szarlotka', 380, './assets/szarlotka.png'),
            new Dish('Kotlet Schabowy', 740, './assets/schabowy.png')];

interface Cart {
    [key: string]: number;
}

function returnPageBeingDisplayed():string {
    let currentPath:string = window.location.pathname;

    let pageName = currentPath.substring(currentPath.lastIndexOf("/") + 1, currentPath.lastIndexOf("."));
    return pageName;
}

let cart:Cart;

let item = localStorage.getItem('cart');
if(item) cart = JSON.parse(item);
else cart = {};

let items_in_cart = Object.entries(cart).filter(([key, value]) => {
    return value > 0;
});

displayNavigationBar("toolbar");

function displayNavigationBar(id) {
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

for(let i = 0; i < dishes.length; i++)
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

items_in_cart.forEach(element => {
    displayProductInCart(element[0]);
});

function displayProductInCart (productId) {
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

if(returnPageBeingDisplayed() === 'cart')
{
    items_in_cart.forEach(element => {
        let increase_button = document.getElementById(element[0]);

        if(increase_button)
        {
            increase_button.addEventListener("click", function()
            {
                cart[element[0]] += 1;
    
                localStorage.setItem('cart', JSON.stringify(cart));
                location.reload();
            });
        }

        let decrease_button = document.getElementById(element[0] + dishes.length);

        if(decrease_button)
        {
            decrease_button.addEventListener("click", function()
            {
                if(cart[element[0]] > 0) cart[element[0]] -= 1;
                console.log(cart);

                if(cart[element[0]] === 0) delete cart[element[0]];
                console.log(cart);
    
                localStorage.setItem('cart', JSON.stringify(cart));
                location.reload();
            });
        }
    })
}

let total_amount = document.getElementById('total-amount');

if(total_amount)
{
    let sum = 0;

    items_in_cart.forEach(element => {
        sum += element[1] * dishes[element[0]].price;
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
}