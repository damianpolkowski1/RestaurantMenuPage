import {
  getSpecificDish,
  Dish,
  updateSpecificDish,
  createNewDish,
  deleteDish,
} from "./api-utils";
import { items_in_cart } from "./index";
import { closePopup } from "./utils";

export async function createUpdatePopUpWindow(dishId: string) {
  const dish_request = getSpecificDish(dishId);
  const dish_data: Dish = await dish_request;

  const popupOverlay = document.createElement("div");
  popupOverlay.setAttribute("class", "overlay-container");
  popupOverlay.setAttribute("id", "modify-popupOverlay");

  const popupWindow = document.createElement("div");
  popupWindow.setAttribute("class", "popup-window");

  const popupTitle = document.createElement("h2");
  popupTitle.textContent = `Modify ${dish_data.name}:`;

  const popupForm = document.createElement("form");
  popupForm.setAttribute("class", "popup-form-container");
  popupForm.setAttribute("id", "modify-popup-form");
  popupForm.setAttribute("enctype", "multipart/form-data");

  const nameLabel = document.createElement("label");
  nameLabel.setAttribute("class", "popup-form-label");
  nameLabel.setAttribute("for", "name-input");
  nameLabel.textContent = "Enter Name";

  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("class", "popup-form-input");
  nameInput.setAttribute("id", "name-input");
  nameInput.setAttribute("name", "name");
  nameInput.setAttribute("value", dish_data.name);

  const priceLabel = document.createElement("label");
  priceLabel.setAttribute("class", "popup-form-label");
  priceLabel.setAttribute("for", "price-input");
  priceLabel.textContent = "Enter Price";

  const priceInput = document.createElement("input");
  priceInput.setAttribute("type", "number");
  priceInput.setAttribute("class", "popup-form-input");
  priceInput.setAttribute("id", "price-input");
  priceInput.setAttribute("name", "price");
  priceInput.setAttribute("value", String(dish_data.price));

  const imageLabel = document.createElement("label");
  imageLabel.setAttribute("class", "popup-form-label");
  imageLabel.setAttribute("for", "image-input");
  imageLabel.textContent = "Select image from your local files";

  const imageInput = document.createElement("input");
  imageInput.setAttribute("type", "file");
  imageInput.setAttribute("accept", ".png,.jpg,.jpeg");
  imageInput.setAttribute("class", "popup-form-input");
  imageInput.setAttribute("id", "image-input");
  imageInput.setAttribute("name", "picture_link");

  const internetImageLabel = document.createElement("label");
  internetImageLabel.setAttribute("class", "popup-form-label");
  internetImageLabel.setAttribute("for", "internet-image-input");
  internetImageLabel.textContent =
    "Paste here a link to image from the Internet";

  const internetImageInput = document.createElement("input");
  internetImageInput.setAttribute("type", "text");
  internetImageInput.setAttribute("class", "popup-form-input");
  internetImageInput.setAttribute("id", "internet-image-input");
  internetImageInput.setAttribute("name", "picture_link");
  internetImageInput.setAttribute("value", dish_data.picture_link);

  const submitFormButton = document.createElement("button");
  submitFormButton.setAttribute("type", "submit");
  submitFormButton.setAttribute("class", "submit-button");
  submitFormButton.textContent = "Submit";

  nameInput.setAttribute("required", "");
  priceInput.setAttribute("required", "");
  imageInput.setAttribute("required", "");

  popupForm.appendChild(nameLabel);
  popupForm.appendChild(nameInput);
  popupForm.appendChild(priceLabel);
  popupForm.appendChild(priceInput);
  popupForm.appendChild(imageLabel);
  popupForm.appendChild(imageInput);
  // popupForm.appendChild(internetImageLabel);
  // popupForm.appendChild(internetImageInput);

  popupForm.appendChild(submitFormButton);

  const closeFormButton = document.createElement("button");
  closeFormButton.setAttribute("type", "button");
  closeFormButton.setAttribute("class", "close-form-button");
  closeFormButton.setAttribute("onclick", 'closePopup("modify-popupOverlay")');
  closeFormButton.textContent = "Close";

  popupWindow.appendChild(popupTitle);
  popupWindow.appendChild(popupForm);
  popupWindow.appendChild(closeFormButton);

  popupOverlay.appendChild(popupWindow);

  document.body.appendChild(popupOverlay);

  onUpdateFormSubmittion("modify-popup-form", dishId);
}

function onUpdateFormSubmittion(FormId: string, entityId: string) {
  const form = document.getElementById(FormId) as HTMLFormElement;

  form.addEventListener("submit", function (submittion) {
    submittion.preventDefault();

    fetch("http://localhost:2137/dish/update/" + entityId, {
      method: "POST",
      body: new FormData(this),
    }).then((response) => {
      if (response.ok) {
        closePopup("modify-popupOverlay");
      }
    });
  });
}

export async function createAddingPopUpWindow() {
  let popupOverlay = document.createElement("div");
  popupOverlay.setAttribute("class", "overlay-container");
  popupOverlay.setAttribute("id", "add-PopupOverlay");

  let popupWindow = document.createElement("div");
  popupWindow.setAttribute("class", "popup-window");

  let popupTitle = document.createElement("h2");
  popupTitle.textContent = `Add new dish:`;

  let popupForm = document.createElement("form");
  popupForm.setAttribute("class", "popup-form-container");
  popupForm.setAttribute("id", "adding-popup-form");

  let nameLabel = document.createElement("label");
  nameLabel.setAttribute("class", "popup-form-label");
  nameLabel.setAttribute("for", "name-input");
  nameLabel.textContent = "Name";

  let nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("class", "popup-form-input");
  nameInput.setAttribute("id", "name-input");
  nameInput.setAttribute("name", "name");

  let priceLabel = document.createElement("label");
  priceLabel.setAttribute("class", "popup-form-label");
  priceLabel.setAttribute("for", "price-input");
  priceLabel.textContent = "Price";

  let priceInput = document.createElement("input");
  priceInput.setAttribute("type", "number");
  priceInput.setAttribute("class", "popup-form-input");
  priceInput.setAttribute("id", "price-input");
  priceInput.setAttribute("name", "price");

  const imageLabel = document.createElement("label");
  imageLabel.setAttribute("class", "popup-form-label");
  imageLabel.setAttribute("for", "image-input");
  imageLabel.textContent = "Select image from your local files";

  const imageInput = document.createElement("input");
  imageInput.setAttribute("type", "file");
  imageInput.setAttribute("accept", ".png,.jpg,.jpeg");
  imageInput.setAttribute("class", "popup-form-input");
  imageInput.setAttribute("id", "image-input");
  imageInput.setAttribute("name", "picture_link");

  let submitFormButton = document.createElement("button");
  submitFormButton.setAttribute("type", "submit");
  submitFormButton.setAttribute("class", "submit-button");
  submitFormButton.textContent = "Submit";

  nameInput.setAttribute("required", "");
  priceInput.setAttribute("required", "");
  imageInput.setAttribute("required", "");

  popupForm.appendChild(nameLabel);
  popupForm.appendChild(nameInput);
  popupForm.appendChild(priceLabel);
  popupForm.appendChild(priceInput);
  popupForm.appendChild(imageLabel);
  popupForm.appendChild(imageInput);

  popupForm.appendChild(submitFormButton);

  let closeFormButton = document.createElement("button");
  closeFormButton.setAttribute("type", "button");
  closeFormButton.setAttribute("class", "close-form-button");
  closeFormButton.setAttribute("onclick", 'closePopup("add-PopupOverlay")');
  closeFormButton.textContent = "Close";

  popupWindow.appendChild(popupTitle);
  popupWindow.appendChild(popupForm);
  popupWindow.appendChild(closeFormButton);

  popupOverlay.appendChild(popupWindow);

  document.body.appendChild(popupOverlay);

  onAddingFormSubmittion("adding-popup-form");
}

function onAddingFormSubmittion(formId: string) {
  const form = document.getElementById(formId) as HTMLFormElement;

  form.addEventListener("submit", function (submittion) {
    submittion.preventDefault();

    fetch("http://localhost:2137/dish/create/", {
      method: "POST",
      body: new FormData(this),
    }).then((response) => {
      if (response.ok) {
        closePopup("add-PopupOverlay");
        location.reload();
      }
    });
  });

  /*const form = document.getElementById(formId) as HTMLFormElement;

  const body_object: Record<string, any> = {};

  if (form) {
    form.addEventListener("submit", function (submittion) {
      submittion.preventDefault();
      const formData = new FormData(form);

      formData.forEach((value, key) => {
        if (key === "price") {
          body_object[key] = parseFloat(value.toString());
        } else {
          body_object[key] = value.toString();
        }
      });
      createNewDish(body_object);
      closePopup("add-PopupOverlay");
    });
  }*/
}

export async function createDeletingPopUpWindow(dishId: string) {
  const dish_request = getSpecificDish(dishId);
  const dish_data: Dish = await dish_request;

  let is_dish_in_cart: boolean = false;

  items_in_cart.forEach((element) => {
    if (element[0] == dishId) {
      is_dish_in_cart = true;
      let popupOverlay = document.createElement("div");
      popupOverlay.setAttribute("class", "overlay-container");
      popupOverlay.setAttribute("id", "delete-PopupOverlay");

      let popupWindow = document.createElement("div");
      popupWindow.setAttribute("class", "popup-window");

      let popupTitle = document.createElement("h2");
      popupTitle.textContent = `Cannot delete ${dish_data.name} because it is in cart`;

      let closeButton = document.createElement("button");
      closeButton.setAttribute("type", "delete");
      closeButton.setAttribute("class", "do-not-delete-button");
      closeButton.setAttribute("onclick", 'closePopup("delete-PopupOverlay")');
      closeButton.textContent = "Close";

      popupWindow.appendChild(popupTitle);
      popupWindow.appendChild(closeButton);

      popupOverlay.appendChild(popupWindow);

      document.body.appendChild(popupOverlay);
    }
  });

  if (!is_dish_in_cart) {
    let popupOverlay = document.createElement("div");
    popupOverlay.setAttribute("class", "overlay-container");
    popupOverlay.setAttribute("id", "delete-PopupOverlay");

    let popupWindow = document.createElement("div");
    popupWindow.setAttribute("class", "popup-window");

    let popupTitle = document.createElement("h2");
    popupTitle.textContent = `Are you sure you want to delete ${dish_data.name}?`;

    let yesButton = document.createElement("button");
    yesButton.setAttribute("type", "delete");
    yesButton.setAttribute("class", "delete-button");
    yesButton.setAttribute("id", "confirm-delete-button");
    yesButton.textContent = "Yes";

    let noButton = document.createElement("button");
    noButton.setAttribute("type", "delete");
    noButton.setAttribute("class", "do-not-delete-button");
    noButton.setAttribute("onclick", 'closePopup("delete-PopupOverlay")');
    noButton.textContent = "No";

    popupWindow.appendChild(popupTitle);
    popupWindow.appendChild(yesButton);
    popupWindow.appendChild(noButton);

    popupOverlay.appendChild(popupWindow);

    document.body.appendChild(popupOverlay);

    const confirmDeletingButton = document.getElementById(
      "confirm-delete-button"
    );

    if (confirmDeletingButton) {
      confirmDeletingButton.addEventListener("click", async function () {
        await deleteDish(dishId);
        closePopup("delete-PopupOverlay");
        location.reload();
      });
    }
  }
}
