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
const productsContainer = document.getElementById("products");
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});
const linkViewDetailsBtn = () => {
    const viewDetailsBtn = document.querySelectorAll(".view-details");
    viewDetailsBtn.forEach((button) => {
        button.addEventListener("click", (event) => {
            const target = event.target;
            const productId = target.getAttribute("data-id");
            if (productId) {
                window.location.href = `product.html?id=${productId}`;
            }
        });
    });
};
const linkAddToCartBtn = () => {
    const addToCartBtn = document.querySelectorAll(".add-to-cart");
    addToCartBtn.forEach((button) => {
        button.addEventListener("click", (event) => {
            const target = event.target;
            const productId = target.getAttribute("data-id");
            if (productId) {
                addToCart(Number(productId));
            }
        });
    });
};
const createProductCard = (product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("col-md-3", "mb-4");
    productCard.innerHTML = `
        <div class="card h-100 shadow-sm">
            <img src="${product.image}" class="card-img-top p-3" alt="${product.title}" height="200">
            <div class="card-body text-center">
                <h6 class="card-title">${product.title}</h6>
                <p class="card-text"><strong>$${product.price}</strong></p>
                <button class="btn btn-primary btn-sm view-details" data-id="${product.id}">View Details</button>
                <button class="btn btn-success btn-sm add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;
    return productCard;
};
const displayProducts = (products) => {
    if (!productsContainer)
        return;
    products.forEach((product) => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
    linkViewDetailsBtn();
    linkAddToCartBtn();
};
const fetchProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get("https://fakestoreapi.com/products");
        displayProducts(response.data);
    }
    catch (error) {
        console.error("Error fetching page:", error);
    }
    ;
});
