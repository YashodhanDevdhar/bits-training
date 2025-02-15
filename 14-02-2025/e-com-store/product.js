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
const productImage = document.getElementById("product-image");
const productTitle = document.getElementById("product-title");
const productDescription = document.getElementById("product-description");
const productPrice = document.getElementById("product-price");
const addToCartBtn = document.querySelector(".add-to-cart");
const params = new URLSearchParams(window.location.search);
let productId = params.get("id");
const addInfoProductCard = (product) => {
    productImage.src = product.image;
    productTitle.innerHTML = product.title;
    productDescription.innerHTML = product.description;
    productPrice.innerHTML = `$${product.price}`;
};
const addToCartBtnClick = () => {
    addToCartBtn.addEventListener("click", () => {
        console.log(productId);
    });
};
const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get(`https://fakestoreapi.com/products/${productId}`);
        addInfoProductCard(response.data);
        addToCartBtnClick();
    }
    catch (error) {
        console.error("Error : ", error);
    }
    ;
});
if (!productId)
    console.log("Product id not found in the URL");
else
    fetchData();
