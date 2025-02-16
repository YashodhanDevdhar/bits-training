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
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    const cartProductsContainer = document.getElementById("ul-todo");
    const total = document.querySelector(".total");
    const latestCartProducts = yield fetchCartData();
    displayCartProducts(cartProductsContainer, latestCartProducts);
    displayTotal(total, latestCartProducts);
}));
const userId = 1;
console.log("User ID:", userId);
const addToCart = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.post("https://fakestoreapi.com/carts", {
            userId: userId,
            date: new Date().toISOString().split('T')[0],
            products: [{ productId: productId, quantity: 1 }]
        });
        console.log("Cart updated", response.data);
        alert(`POST Request\nStatus code: ${response.status}\nProduct added successfully!`);
    }
    catch (error) {
        console.error("Error adding to cart", error);
        alert(`POST Request\nFailed to add product to cart`);
    }
});
const fetchCartData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get(`https://fakestoreapi.com/carts/user/${userId}`);
        const carts = response.data;
        return carts.length > 0 ? carts[carts.length - 1].products : [];
    }
    catch (error) {
        console.error("Cannot get cart data", error);
        return [];
    }
});
const displayCartProducts = (cartProductsContainer, cartProducts) => {
    cartProductsContainer.innerHTML = "";
    cartProducts.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
        const productDetails = yield getProductDetails(product.productId);
        const productCard = createCartProductCard(product.quantity, productDetails);
        cartProductsContainer.appendChild(productCard);
    }));
    setTimeout(() => {
        minusBtnClick();
        addBtnClick();
        deleteBtnClick();
    }, 500);
};
const deleteBtnClick = () => {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
            const productId = event.target.dataset.productId;
            console.log(`Delete button clicked for product ID: ${productId}`);
            try {
                const response = yield axios.delete(`https://fakestoreapi.com/carts/${userId}`);
                console.log("DELETE request successful:", response.data);
                alert(`DELETE Request\nStatus code: ${response.status}`);
            }
            catch (error) {
                console.error("Error deleting product", error);
                alert("DELETE Request\nFailed to delete product");
            }
        }));
    });
};
const addBtnClick = () => {
    document.querySelectorAll(".quantity-right-plus").forEach((btn) => {
        btn.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
            const productId = event.target.dataset.productId;
            try {
                const response = yield axios.patch(`https://fakestoreapi.com/carts/${userId}`, {
                    products: [{ productId: productId, quantity: 1 }]
                });
                alert(`PATCH Request\nStatus code: ${response.status}`);
            }
            catch (error) {
                console.error("Error updating cart", error);
                alert("PATCH Request\nFailed to update cart");
            }
        }));
    });
};
const minusBtnClick = () => {
    document.querySelectorAll(".quantity-left-minus").forEach((btn) => {
        btn.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
            const productId = event.target.dataset.productId;
            try {
                const response = yield axios.patch(`https://fakestoreapi.com/carts/${userId}`, {
                    products: [{ productId: productId, quantity: 1 }]
                });
                alert(`PATCH Request\nStatus code: ${response.status}`);
            }
            catch (error) {
                console.error("Error updating cart", error);
                alert("PATCH Request\nFailed to update cart");
            }
        }));
    });
};
const displayTotal = (total, cartProducts) => __awaiter(void 0, void 0, void 0, function* () {
    let totalPrice = 0;
    for (const product of cartProducts) {
        const productDetails = yield getProductDetails(product.productId);
        totalPrice += product.quantity * productDetails.price;
    }
    total.innerHTML = `<strong>Total :</strong><span> $ ${totalPrice}</span>`;
});
const getProductDetails = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.get(`https://fakestoreapi.com/products/${productId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching product details:", error);
        return { id: 0, image: "", title: "", price: 0 };
    }
});
const createCartProductCard = (quantity, productDetails) => {
    const productCard = document.createElement("li");
    productCard.className = "list-group-item d-flex justify-content-between align-items-start";
    productCard.innerHTML = `
        <div class="container">
            <div class="card shadow-sm border rounded-3 p-3">
                <div class="row">
                    <div class="col-md-6">
                        <img src="${productDetails.image}" class="img-fluid w-100" style="max-height: 120px; object-fit: contain;" alt="Product Image">
                    </div>
                    <div class="col-md-6 card-body border-start">
                        <h6>${productDetails.title}</h6>
                        <p><strong>Price:</strong> $<span>${productDetails.price}</span></p>
                        <p><strong>Quantity:</strong> 
                            <button type="button" class="quantity-left-minus btn btn-danger" data-product-id="${productDetails.id}">-</button>
                            <span>${quantity}</span>
                            <button type="button" class="quantity-right-plus btn btn-success" data-product-id="${productDetails.id}">+</button>
                        </p>
                        <button type="button" class="delete-btn btn btn-danger" data-product-id="${productDetails.id}">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    return productCard;
};
