import './css/styles.css';
import './css/about-us_styles.css';
import './css/cart_styles.css';
import './css/index_styles.css';
import './css/menu_styles.css';
import axios from '../node_modules/axios/index';

import {displayNavigationBar, renderDishesInMenu, displayProductsInCart,
        generateCartSummary, listenToCartButtonsEvent} from './utils';

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

interface Cart {
    [key: string]: number;
}

let cart:Cart;

let item = localStorage.getItem('cart');
if(item) cart = JSON.parse(item);
else cart = {};

let items_in_cart = Object.entries(cart).filter(([key, value]) => {
    return value > 0;
});

displayNavigationBar("toolbar");

renderDishesInMenu(cart);

items_in_cart.forEach(element => {
    displayProductsInCart(Number(element[0]), cart);
});
listenToCartButtonsEvent(cart);

let total_amount: HTMLElement | null = document.getElementById('total-amount');

generateCartSummary(total_amount);

async function getAllDishes()
{
    try
    {
      const response = await fetch('http://localhost:2137/dish');
      
      if (!response.ok)
      {
        throw new Error('Bajo jajo, server not working');
      }
      
      const data = await response.json();
      console.log(data);
    }
    catch (error)
    {
      console.error('Error happenned: ', error);
    }
}

async function getSpecificDish(id: string) {
    try
    {
      const response = await fetch('http://localhost:2137/dish/' + id);
      
      if (!response.ok)
      {
        throw new Error('Bajo jajo, server not working');
      }
      
      const data = await response.json();
      console.log(data);
    }
    catch (error)
    {
      console.error('Error happened: ', error);
    }
}

getAllDishes();

export {items_in_cart};