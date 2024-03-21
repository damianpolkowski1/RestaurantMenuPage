import { items_in_cart } from "./index";
import { getDishesData, getSpecificDish, Dish } from "./api-utils";
import { v4 as uuidv4 } from "uuid";
import {
  createUpdatePopUpWindow,
  createAddingPopUpWindow,
  createDeletingPopUpWindow,
} from "./popup-utils";

interface Cart {
  [key: string]: number;
}

export function displayNavigationBar(id: string) {
  let ul = document.createElement("ul");
  ul.setAttribute("class", "toolbar-list");

  let navbar_content = [
    { link: "./index.html", name: "Start" },
    { link: "./menu.html", name: "Menu" },
    { link: "./about-us.html", name: "About Us" },
    { link: "./cart.html", name: "Cart" },
    { link: "./modify.html", name: "Modify" },
  ];

  for (let i = 0; i < navbar_content.length; i++) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.setAttribute("href", navbar_content[i].link);

    let a_text;

    if (i !== 3) {
      a_text = document.createTextNode(navbar_content[i].name);
    } else {
      let summed_items = 0;

      items_in_cart.forEach((element) => {
        summed_items += element[1];
      });

      if (summed_items !== 0)
        a_text = document.createTextNode(
          navbar_content[i].name + ` (${summed_items} Items)`
        );
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

export async function renderDishesInMenu(cart: Cart) {
  let dishes_list: Dish[] = [];

  getDishesData().then((data) => {
    dishes_list = data;

    for (let i = 0; i < dishes_list.length; i++) {
      let newDish = document.createElement("li");

      let dishName = dishes_list[i].name;
      let dishPrice = dishes_list[i].price;
      let pictureLink = dishes_list[i].picture_link;

      let image = document.createElement("img");
      image.src = pictureLink;

      let addToCartDiv = document.createElement("div");
      addToCartDiv.classList.add("add-to-cart-button");

      let header = document.createElement("h4");
      let header_text = document.createTextNode(
        `${dishName} (${dishPrice} RSD)`
      );
      header.appendChild(header_text);

      let button = document.createElement("button");
      button.setAttribute("type", "button");
      button.setAttribute("class", "menu_button");
      button.setAttribute("id", dishes_list[i].id);
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
  });
}

async function listenToMenuButtonsEvent(cart: Cart) {
  getDishesData().then((data) => {
    data.forEach((element) => {
      let button = document.getElementById(element.id);

      if (button) {
        button.addEventListener("click", function () {
          if (cart.hasOwnProperty(element.id)) {
            cart[element.id] += 1;
          } else {
            cart[element.id] = 1;
          }

          localStorage.setItem("cart", JSON.stringify(cart));
          location.reload();
        });
      }
    });
  });
}

export async function displayProductsInCart(productId: string, cart: Cart) {
  let dish_to_display: Dish;

  getSpecificDish(productId).then((data) => {
    dish_to_display = data;

    let newDish = document.createElement("li");

    let dishName = dish_to_display.name;
    let dishPrice = dish_to_display.price;
    let quantity = cart[productId];

    let header = document.createElement("h4");
    let header_text = document.createTextNode(
      `${dishName}: ${quantity} --- ${dishPrice * quantity} RSD`
    );
    header.appendChild(header_text);

    const increaseId = uuidv4();
    const decreaseId = uuidv4();

    let increaseButton = document.createElement("button");
    increaseButton.setAttribute("type", "button");
    increaseButton.setAttribute("class", "increase-cart-button");
    increaseButton.setAttribute("id", increaseId);
    increaseButton.textContent = "+";

    getDishesData().then((data) => {
      let decreaseButton = document.createElement("button");
      decreaseButton.setAttribute("type", "button");
      decreaseButton.setAttribute("class", "decrease-cart-button");
      decreaseButton.setAttribute("id", decreaseId);
      decreaseButton.textContent = "-";

      newDish.appendChild(header);
      newDish.appendChild(increaseButton);
      newDish.appendChild(decreaseButton);

      const element = document.getElementById("cart-items");

      if (element) element.appendChild(newDish);

      let increase_button = document.getElementById(increaseId);
      let decrease_button = document.getElementById(decreaseId);

      if (increase_button) {
        increase_button.addEventListener("click", function () {
          cart[productId] += 1;

          localStorage.setItem("cart", JSON.stringify(cart));
          location.reload();
        });
      }

      if (decrease_button) {
        decrease_button.addEventListener("click", function () {
          if (cart[productId] > 0) cart[productId] -= 1;
          console.log(cart);

          if (cart[productId] === 0) delete cart[productId];
          console.log(cart);

          localStorage.setItem("cart", JSON.stringify(cart));
          location.reload();
        });
      }
    });
  });
}

export async function generateCartSummary(total_amount: HTMLElement | null) {
  if (total_amount) {
    getDishesData().then((data) => {
      let dishes_list: Dish[] = data;
      console.log(dishes_list);
      let sum = 0;

      items_in_cart.forEach((element) => {
        const dish_to_calculate = dishes_list.find((e) => e.id === element[0]);

        if (dish_to_calculate) sum += element[1] * dish_to_calculate.price; //quantity * price
      });

      if (sum !== 0) {
        let summary = document.createElement("h3");
        let summary_content = document.createTextNode(`Total: ${sum} RSD`);
        summary.appendChild(summary_content);

        let payment_button = document.createElement("button");
        let button_text = document.createTextNode("Proceed to Payment");
        payment_button.appendChild(button_text);

        total_amount.appendChild(summary);
        total_amount.appendChild(payment_button);
      } else {
        let summary = document.createElement("h2");
        let summary_content = document.createTextNode("Your cart is empty!");
        summary.style.paddingBottom = "30vh";
        summary.style.width = "100%";
        summary.appendChild(summary_content);

        total_amount.appendChild(summary);
      }
    });
  }
}

export async function renderModifyPage() {
  let dishes_list: Dish[] = [];
  let button_ids: { buttonID: string; entityID: string }[] = []; //Holds button IDs associated with specific entity IDs in the DB

  let add_button = document.createElement("button");
  add_button.setAttribute("type", "button");
  add_button.setAttribute("class", "control-button");
  add_button.setAttribute("id", "add-entity-button");
  add_button.textContent = "Add Entity";

  const add_delete_div = document.getElementById("add-delete");

  if (add_delete_div) add_delete_div.appendChild(add_button);

  getDishesData().then((data) => {
    dishes_list = data;

    for (let i = 0; i < dishes_list.length; i++) {
      button_ids.push({
        buttonID: String(uuidv4()),
        entityID: dishes_list[i].id,
      });

      let newDish = document.createElement("li");

      let dishName = dishes_list[i].name;
      let dishId = dishes_list[i].id;

      let ModifyDiv = document.createElement("div");
      ModifyDiv.classList.add("modify-div");

      let header = document.createElement("h4");
      let header_text = document.createTextNode(
        `ID: ${dishId}, Name: ${dishName}`
      );
      header.appendChild(header_text);

      let modifyButton = document.createElement("button");
      modifyButton.setAttribute("type", "button");
      modifyButton.setAttribute("class", "modify-button");
      modifyButton.setAttribute("id", button_ids[i].buttonID);
      modifyButton.textContent = "Modify";

      let deleteButton = document.createElement("button");
      deleteButton.setAttribute("type", "button");
      deleteButton.setAttribute("class", "delete-button");
      deleteButton.setAttribute("id", "delete-" + button_ids[i].buttonID);
      deleteButton.textContent = "Delete";

      ModifyDiv.appendChild(modifyButton);
      ModifyDiv.appendChild(deleteButton);
      ModifyDiv.appendChild(header);

      newDish.appendChild(ModifyDiv);

      const element = document.getElementById("modify-list");

      if (element) {
        element.appendChild(newDish);
      }
    }

    listenToModifyButtons(button_ids);
    listenToAddDishButton();
    listenToDeleteDishButtons(button_ids);
  });
}

function listenToModifyButtons(
  button_ids: { buttonID: string; entityID: string }[]
) {
  for (let i = 0; i < button_ids.length; i++) {
    const button = document.getElementById(button_ids[i].buttonID);

    if (button) {
      button.addEventListener("click", async function () {
        await createUpdatePopUpWindow(button_ids[i].entityID);
        togglePopup("modify-popupOverlay");
      });
    }
  }
}

function listenToAddDishButton() {
  const button = document.getElementById("add-entity-button");

  if (button) {
    button.addEventListener("click", function () {
      createAddingPopUpWindow();
      togglePopup("add-PopupOverlay");
    });
  }
}

function listenToDeleteDishButtons(
  button_ids: { buttonID: string; entityID: string }[]
) {
  for (let i = 0; i < button_ids.length; i++) {
    const button = document.getElementById("delete-" + button_ids[i].buttonID);

    if (button) {
      button.addEventListener("click", async function () {
        await createDeletingPopUpWindow(button_ids[i].entityID);
        togglePopup("delete-PopupOverlay");
      });
    }
  }
}

export function togglePopup(FormId: string) {
  const overlay = document.getElementById(FormId);
  if (overlay) overlay.classList.toggle("show");
}

export function closePopup(FormId: string) {
  const overlay = document.getElementById(FormId);
  if (overlay) {
    overlay.classList.toggle("hide");
    overlay.remove();
  }
}
