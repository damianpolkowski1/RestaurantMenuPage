import _ from 'lodash';
import './styles.css';
import './about-us_styles.css';
import './cart_styles.css';
import './index_styles.css';
import './menu_styles.css';
import {displayNavigationBar, displayProductInCart, displayDishesInMenu} from './utils.js';

class Dish {
    constructor(name, price, picture_link) {
        this.name = name;
        this.price = price;
        this.picture_link = picture_link;
      }
}

let dishes = [new Dish('Pljeskavica', 660, './images/pljeskavica.png'),
            new Dish('Pierogi', 720, './images/pierogi.png'),
            new Dish('Żurek', 530, './images/zurek.png'),
            new Dish('Rizotto', 580, './images/rizoto.png'),
            new Dish('Rosół', 410, './images/rosol.png'),
            new Dish('Bigos', 650, './images/bigos.png'),
            new Dish('Cevapi', 700, './images/cevapi.png'),
            new Dish('Sernik', 360, './images/sernik.png'),
            new Dish('Szarlotka', 380, './images/szarlotka.png'),
            new Dish('Kotlet Schabowy', 740, './images/schabowy.png')];

let cart = JSON.parse(localStorage.getItem('cart')) || {};

let items_in_cart = Object.entries(cart).filter(([key, value]) => {
    return value > 0;
});

displayNavigationBar("toolbar", items_in_cart);

displayDishesInMenu(dishes);

for(let i = 0; i < dishes.length; i++)
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
            location.reload();
        });
    }
}

items_in_cart.forEach(element => {
    displayProductInCart(element[0], dishes, cart);
});

if(displayingPage === 'cart')
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
        sum += parseInt(element[1] * dishes[element[0]].price);
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