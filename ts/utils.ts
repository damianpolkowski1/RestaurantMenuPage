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

export function displayNavigationBar(elementId: string) {
  const ul = document.createElement("ul");
  ul.setAttribute("class", "toolbar-list");

  const navbar_content = [
    { link: "./index.html", name: "Start" },
    { link: "./menu.html", name: "Menu" },
    { link: "./about-us.html", name: "About Us" },
    { link: "./cart.html", name: "Cart" },
    { link: "./modify.html", name: "Modify" },
  ];

  for (let i = 0; i < navbar_content.length; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
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

  const element = document.getElementById(elementId);

  if (element) {
    element.appendChild(ul);
  }
}

export function displayFooter(elementId: string) {
  const footer_list = document.createElement("ul");
  footer_list.setAttribute("class", "footer-list");

  const footer_text = document.createElement("li");
  footer_text.setAttribute("class", "footer-text");

  const text_header = document.createElement("h4");
  const text_header_content = document.createTextNode("Contact Details:");
  text_header.appendChild(text_header_content);

  const text_paragraph = document.createElement("p");
  const text_paragraph_content1 = document.createTextNode(
    "Address: Some example address"
  );

  const text_paragraph_content2 = document.createTextNode(
    "Phone: +381 99 9999999"
  );
  const text_paragraph_content3 = document.createTextNode(
    "Opening Hours: 10AM - 11PM"
  );

  text_paragraph.appendChild(text_paragraph_content1);
  text_paragraph.appendChild(document.createElement("br"));
  text_paragraph.appendChild(text_paragraph_content2);
  text_paragraph.appendChild(document.createElement("br"));
  text_paragraph.appendChild(text_paragraph_content3);

  footer_text.appendChild(text_header);
  footer_text.appendChild(text_paragraph);

  const footer_icons = document.createElement("li");
  footer_icons.setAttribute("class", "footer-icons");

  const icons_header = document.createElement("h4");
  const icons_header_content = document.createTextNode("Reach out to us!");
  icons_header.appendChild(icons_header_content);

  const icons_image_viber = document.createElement("img");
  icons_image_viber.setAttribute("src", "./images/viber_logo.png");

  const icons_image_whatsapp = document.createElement("img");
  icons_image_whatsapp.setAttribute("src", "./images/whatsapp_logo.png");

  footer_icons.appendChild(icons_header);
  footer_icons.appendChild(icons_image_viber);
  footer_icons.appendChild(icons_image_whatsapp);

  footer_list.appendChild(footer_text);
  footer_list.appendChild(footer_icons);

  const element = document.getElementById(elementId);

  if (element) {
    element.appendChild(footer_list);
  }
}

export async function renderDishesInMenu(cart: Cart) {
  getDishesData().then((data) => {
    const dishes_list = data;

    for (let i = 0; i < dishes_list.length; i++) {
      const newDish = document.createElement("li");

      const dishName = dishes_list[i].name;
      const dishPrice = dishes_list[i].price;
      const pictureLink = dishes_list[i].picture_link;

      const image = document.createElement("img");
      image.src = pictureLink;

      const addToCartDiv = document.createElement("div");
      addToCartDiv.classList.add("add-to-cart-button");

      const header = document.createElement("h4");
      const header_text = document.createTextNode(
        `${dishName} (${dishPrice} RSD)`
      );
      header.appendChild(header_text);

      const button = document.createElement("button");
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
      const button = document.getElementById(element.id);

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
  getSpecificDish(productId).then((data) => {
    const dish_to_display: Dish = data;

    const newDish = document.createElement("li");

    const dishName = dish_to_display.name;
    const dishPrice = dish_to_display.price;
    const quantity = cart[productId];

    const header = document.createElement("h4");
    const header_text = document.createTextNode(
      `${dishName}: ${quantity} --- ${dishPrice * quantity} RSD`
    );
    header.appendChild(header_text);

    const increaseId = uuidv4();
    const decreaseId = uuidv4();

    const increaseButton = document.createElement("button");
    increaseButton.setAttribute("type", "button");
    increaseButton.setAttribute("class", "increase-cart-button");
    increaseButton.setAttribute("id", increaseId);
    increaseButton.textContent = "+";

    const decreaseButton = document.createElement("button");
    decreaseButton.setAttribute("type", "button");
    decreaseButton.setAttribute("class", "decrease-cart-button");
    decreaseButton.setAttribute("id", decreaseId);
    decreaseButton.textContent = "-";

    newDish.appendChild(header);
    newDish.appendChild(increaseButton);
    newDish.appendChild(decreaseButton);

    const element = document.getElementById("cart-items");

    if (element) element.appendChild(newDish);

    const increase_button = document.getElementById(increaseId);
    const decrease_button = document.getElementById(decreaseId);

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
}

export async function generateCartSummary(total_amount: HTMLElement | null) {
  if (total_amount) {
    getDishesData().then((data) => {
      const dishes_list: Dish[] = data;
      let sum = 0;

      items_in_cart.forEach((element) => {
        const dish_to_calculate = dishes_list.find((e) => e.id === element[0]);

        if (dish_to_calculate) sum += element[1] * dish_to_calculate.price; //quantity * price
      });

      displayCartSummary(sum, total_amount);
    });
  }
}

function displayCartSummary(sum: number, total_amount: HTMLElement) {
  if (sum !== 0) {
    const summary = document.createElement("h3");
    const summary_content = document.createTextNode(`Total: ${sum} RSD`);
    summary.appendChild(summary_content);

    const payment_button = document.createElement("button");
    const button_text = document.createTextNode("Proceed to Payment");
    payment_button.appendChild(button_text);

    total_amount.appendChild(summary);
    total_amount.appendChild(payment_button);
  } else {
    const summary = document.createElement("h2");
    const summary_content = document.createTextNode("Your cart is empty!");
    summary.style.paddingBottom = "30vh";
    summary.style.width = "100%";
    summary.appendChild(summary_content);

    total_amount.appendChild(summary);
  }
}

export async function renderModifyPage() {
  const button_ids: { buttonID: string; entityID: string }[] = []; //Holds button IDs associated with specific entity IDs in the DB

  const add_button = document.createElement("button");
  add_button.setAttribute("type", "button");
  add_button.setAttribute("class", "control-button");
  add_button.setAttribute("id", "add-entity-button");
  add_button.textContent = "Add Entity";

  const add_delete_div = document.getElementById("add-delete");

  if (add_delete_div) add_delete_div.appendChild(add_button);

  getDishesData().then((data) => {
    const dishes_list = data;

    for (let i = 0; i < dishes_list.length; i++) {
      button_ids.push({
        buttonID: String(uuidv4()),
        entityID: dishes_list[i].id,
      });

      const newDish = document.createElement("li");

      const dishName = dishes_list[i].name;
      const dishId = dishes_list[i].id;

      const ModifyDiv = document.createElement("div");
      ModifyDiv.classList.add("modify-div");

      const header = document.createElement("h4");
      const header_text = document.createTextNode(
        `ID: ${dishId}, Name: ${dishName}`
      );
      header.appendChild(header_text);

      const modifyButton = document.createElement("button");
      modifyButton.setAttribute("type", "button");
      modifyButton.setAttribute("class", "modify-button");
      modifyButton.setAttribute("id", button_ids[i].buttonID);
      modifyButton.textContent = "Modify";

      const deleteButton = document.createElement("button");
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

    if (!button) return;

    button.addEventListener("click", async function () {
      await createUpdatePopUpWindow(button_ids[i].entityID);
      togglePopup("modify-popupOverlay");
    });
  }
}

function listenToAddDishButton() {
  const button = document.getElementById("add-entity-button");

  if (!button) return;

  button.addEventListener("click", function () {
    createAddingPopUpWindow();
    togglePopup("add-PopupOverlay");
  });
}

function listenToDeleteDishButtons(
  button_ids: { buttonID: string; entityID: string }[]
) {
  for (let i = 0; i < button_ids.length; i++) {
    const button = document.getElementById("delete-" + button_ids[i].buttonID);

    if (!button) return;

    button.addEventListener("click", async function () {
      await createDeletingPopUpWindow(button_ids[i].entityID);
      togglePopup("delete-PopupOverlay");
    });
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
