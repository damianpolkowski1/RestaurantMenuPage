"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeletingPopUpWindow = exports.createAddingPopUpWindow = exports.createUpdatePopUpWindow = void 0;
var api_utils_1 = require("./api-utils");
var index_1 = require("./index");
var utils_1 = require("./utils");
function createUpdatePopUpWindow(dishId) {
    return __awaiter(this, void 0, void 0, function () {
        var dish_request, dish_data, popupOverlay, popupWindow, popupTitle, popupForm, nameLabel, nameInput, priceLabel, priceInput, imageLabel, imageInput, submitFormButton, closeFormButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dish_request = (0, api_utils_1.getSpecificDish)(dishId);
                    return [4 /*yield*/, dish_request];
                case 1:
                    dish_data = _a.sent();
                    popupOverlay = document.createElement("div");
                    popupOverlay.setAttribute("class", "overlay-container");
                    popupOverlay.setAttribute("id", "modify-popupOverlay");
                    popupWindow = document.createElement("div");
                    popupWindow.setAttribute("class", "popup-window");
                    popupTitle = document.createElement("h2");
                    popupTitle.textContent = "Modify ".concat(dish_data.name, ":");
                    popupForm = document.createElement("form");
                    popupForm.setAttribute("class", "popup-form-container");
                    popupForm.setAttribute("id", "modify-popup-form");
                    nameLabel = document.createElement("label");
                    nameLabel.setAttribute("class", "popup-form-label");
                    nameLabel.setAttribute("for", "name-input");
                    nameLabel.textContent = "Name";
                    nameInput = document.createElement("input");
                    nameInput.setAttribute("type", "text");
                    nameInput.setAttribute("class", "popup-form-input");
                    nameInput.setAttribute("id", "name-input");
                    nameInput.setAttribute("name", "name");
                    nameInput.setAttribute("value", dish_data.name);
                    priceLabel = document.createElement("label");
                    priceLabel.setAttribute("class", "popup-form-label");
                    priceLabel.setAttribute("for", "price-input");
                    priceLabel.textContent = "Price";
                    priceInput = document.createElement("input");
                    priceInput.setAttribute("type", "number");
                    priceInput.setAttribute("class", "popup-form-input");
                    priceInput.setAttribute("id", "price-input");
                    priceInput.setAttribute("name", "price");
                    priceInput.setAttribute("value", String(dish_data.price));
                    imageLabel = document.createElement("label");
                    imageLabel.setAttribute("class", "popup-form-label");
                    imageLabel.setAttribute("for", "image-input");
                    imageLabel.textContent = "Image Link";
                    imageInput = document.createElement("input");
                    imageInput.setAttribute("type", "text");
                    imageInput.setAttribute("class", "popup-form-input");
                    imageInput.setAttribute("id", "image-input");
                    imageInput.setAttribute("name", "picture_link");
                    imageInput.setAttribute("value", dish_data.picture_link);
                    submitFormButton = document.createElement("button");
                    submitFormButton.setAttribute("type", "submit");
                    submitFormButton.setAttribute("class", "submit-button");
                    submitFormButton.textContent = "Submit";
                    popupForm.appendChild(nameLabel);
                    popupForm.appendChild(nameInput);
                    popupForm.appendChild(priceLabel);
                    popupForm.appendChild(priceInput);
                    popupForm.appendChild(imageLabel);
                    popupForm.appendChild(imageInput);
                    popupForm.appendChild(submitFormButton);
                    closeFormButton = document.createElement("button");
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
                    return [2 /*return*/];
            }
        });
    });
}
exports.createUpdatePopUpWindow = createUpdatePopUpWindow;
function onUpdateFormSubmittion(FormId, entityId) {
    var form = document.getElementById(FormId);
    var body_object = {
        name: "",
        price: 0,
        picture_link: "",
    };
    if (form) {
        form.addEventListener("submit", function (submittion) {
            submittion.preventDefault();
            var formData = new FormData(form);
            formData.forEach(function (value, key) {
                switch (key) {
                    case "name":
                        body_object.name = value.toString();
                        break;
                    case "price":
                        body_object.price = parseFloat(value.toString());
                        break;
                    case "picture_link":
                        body_object.picture_link = value.toString();
                        break;
                    default:
                        break;
                }
            });
            (0, api_utils_1.updateSpecificDish)(entityId, body_object);
            (0, utils_1.closePopup)("modify-popupOverlay");
        });
    }
}
function createAddingPopUpWindow() {
    return __awaiter(this, void 0, void 0, function () {
        var popupOverlay, popupWindow, popupTitle, popupForm, nameLabel, nameInput, priceLabel, priceInput, imageLabel, imageInput, submitFormButton, closeFormButton;
        return __generator(this, function (_a) {
            popupOverlay = document.createElement("div");
            popupOverlay.setAttribute("class", "overlay-container");
            popupOverlay.setAttribute("id", "add-PopupOverlay");
            popupWindow = document.createElement("div");
            popupWindow.setAttribute("class", "popup-window");
            popupTitle = document.createElement("h2");
            popupTitle.textContent = "Add new dish:";
            popupForm = document.createElement("form");
            popupForm.setAttribute("class", "popup-form-container");
            popupForm.setAttribute("id", "adding-popup-form");
            nameLabel = document.createElement("label");
            nameLabel.setAttribute("class", "popup-form-label");
            nameLabel.setAttribute("for", "name-input");
            nameLabel.textContent = "Name";
            nameInput = document.createElement("input");
            nameInput.setAttribute("type", "text");
            nameInput.setAttribute("class", "popup-form-input");
            nameInput.setAttribute("id", "name-input");
            nameInput.setAttribute("name", "name");
            priceLabel = document.createElement("label");
            priceLabel.setAttribute("class", "popup-form-label");
            priceLabel.setAttribute("for", "price-input");
            priceLabel.textContent = "Price";
            priceInput = document.createElement("input");
            priceInput.setAttribute("type", "number");
            priceInput.setAttribute("class", "popup-form-input");
            priceInput.setAttribute("id", "price-input");
            priceInput.setAttribute("name", "price");
            imageLabel = document.createElement("label");
            imageLabel.setAttribute("class", "popup-form-label");
            imageLabel.setAttribute("for", "image-input");
            imageLabel.textContent = "Image Link";
            imageInput = document.createElement("input");
            imageInput.setAttribute("type", "text");
            imageInput.setAttribute("class", "popup-form-input");
            imageInput.setAttribute("id", "image-input");
            imageInput.setAttribute("name", "picture_link");
            submitFormButton = document.createElement("button");
            submitFormButton.setAttribute("type", "submit");
            submitFormButton.setAttribute("class", "submit-button");
            submitFormButton.textContent = "Submit";
            popupForm.appendChild(nameLabel);
            popupForm.appendChild(nameInput);
            popupForm.appendChild(priceLabel);
            popupForm.appendChild(priceInput);
            popupForm.appendChild(imageLabel);
            popupForm.appendChild(imageInput);
            popupForm.appendChild(submitFormButton);
            closeFormButton = document.createElement("button");
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
            return [2 /*return*/];
        });
    });
}
exports.createAddingPopUpWindow = createAddingPopUpWindow;
function onAddingFormSubmittion(formId) {
    var form = document.getElementById(formId);
    var body_object = {
        name: "",
        price: 0,
        picture_link: "",
    };
    if (form) {
        form.addEventListener("submit", function (submittion) {
            submittion.preventDefault();
            var formData = new FormData(form);
            formData.forEach(function (value, key) {
                switch (key) {
                    case "name":
                        body_object.name = value.toString();
                        break;
                    case "price":
                        body_object.price = parseFloat(value.toString());
                        break;
                    case "picture_link":
                        body_object.picture_link = value.toString();
                        break;
                    default:
                        break;
                }
            });
            (0, api_utils_1.createNewDish)(body_object);
            (0, utils_1.closePopup)("add-PopupOverlay");
        });
    }
}
function createDeletingPopUpWindow(dishId) {
    return __awaiter(this, void 0, void 0, function () {
        var dish_request, dish_data, is_dish_in_cart, popupOverlay, popupWindow, popupTitle, yesButton, noButton, confirmDeletingButton;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dish_request = (0, api_utils_1.getSpecificDish)(dishId);
                    return [4 /*yield*/, dish_request];
                case 1:
                    dish_data = _a.sent();
                    is_dish_in_cart = false;
                    index_1.items_in_cart.forEach(function (element) {
                        if (element[0] == dishId) {
                            is_dish_in_cart = true;
                            var popupOverlay = document.createElement("div");
                            popupOverlay.setAttribute("class", "overlay-container");
                            popupOverlay.setAttribute("id", "delete-PopupOverlay");
                            var popupWindow = document.createElement("div");
                            popupWindow.setAttribute("class", "popup-window");
                            var popupTitle = document.createElement("h2");
                            popupTitle.textContent = "Cannot delete ".concat(dish_data.name, " because it is in cart");
                            var closeButton = document.createElement("button");
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
                        popupOverlay = document.createElement("div");
                        popupOverlay.setAttribute("class", "overlay-container");
                        popupOverlay.setAttribute("id", "delete-PopupOverlay");
                        popupWindow = document.createElement("div");
                        popupWindow.setAttribute("class", "popup-window");
                        popupTitle = document.createElement("h2");
                        popupTitle.textContent = "Are you sure you want to delete ".concat(dish_data.name, "?");
                        yesButton = document.createElement("button");
                        yesButton.setAttribute("type", "delete");
                        yesButton.setAttribute("class", "delete-button");
                        yesButton.setAttribute("id", "confirm-delete-button");
                        yesButton.textContent = "Yes";
                        noButton = document.createElement("button");
                        noButton.setAttribute("type", "delete");
                        noButton.setAttribute("class", "do-not-delete-button");
                        noButton.setAttribute("onclick", 'closePopup("delete-PopupOverlay")');
                        noButton.textContent = "No";
                        popupWindow.appendChild(popupTitle);
                        popupWindow.appendChild(yesButton);
                        popupWindow.appendChild(noButton);
                        popupOverlay.appendChild(popupWindow);
                        document.body.appendChild(popupOverlay);
                        confirmDeletingButton = document.getElementById("confirm-delete-button");
                        if (confirmDeletingButton) {
                            confirmDeletingButton.addEventListener("click", function () {
                                return __awaiter(this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, (0, api_utils_1.deleteDish)(dishId)];
                                            case 1:
                                                _a.sent();
                                                (0, utils_1.closePopup)("delete-PopupOverlay");
                                                location.reload();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            });
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.createDeletingPopUpWindow = createDeletingPopUpWindow;
