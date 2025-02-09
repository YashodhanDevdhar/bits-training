document.addEventListener("DOMContentLoaded", async ()=>{
    const cartProductsContainer = document.getElementById("ul-todo");
    
    const total = document.querySelector(".total");
    const latestCartProducts = await fetchCartData();
    displayCartProducts(cartProductsContainer,latestCartProducts);
    displayTotal(total,latestCartProducts);
});

// const userId = Math.floor(Math.random()*4+1) ;
const userId = 1 ;
console.log("userid : ",userId)

const addToCart = async (productId) => {
    try{
        const response = await axios.post("https://fakestoreapi.com/carts",{
            userId: userId,
            date: new Date().toISOString().split('T')[0],
            products: [{productId: productId, quantity: 1}]
        });

        console.log("cart updated",response.data);
        alert(`POST Request\nstauts code: ${response.status}\nproduct added successfully!`);
    }
    catch(error){
        console.error("error adding to cart", error);
        alert(`POST Request\nstauts code: ${error.status}\nproduct was not added to cart`);
    }
};



const fetchCartData = async () => {
    try{
        const response = await axios.get(`https://fakestoreapi.com/carts/user/${userId}`);
        const carts = response.data;

        if(carts.length > 0){
            const latestCart = carts.slice(-1)[0];
            return latestCart.products;
        }else{
            console.log("cart is empty");
            return [];
        }

    }
    catch(error){
        console.error("!!!cannot get cart data!!!", error);
        return [];
    }
};

const displayCartProducts = (cartProductsContainer,cartProducts) => {
    cartProductsContainer.innerHTML=``;
    
    cartProducts.forEach(async(product)=>{
        const productDetails =await getProductDetails(product.productId);
        console.log(productDetails);
        
        const productCard = createCartProductCard(product.quantity,productDetails);
        cartProductsContainer.appendChild(productCard);
        
    });
    setTimeout(() => {
        minusBtnClick();
        addBtnClick();
        deleteBtnClick();
    }, 500);
};

const deleteBtnClick = () => {
    const deleteBtns = document.querySelectorAll(".delete-btn");

    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const productId = event.target.dataset.productId;

            console.log(`Delete button clicked for product ID: ${productId}`);

            try {
                const response = await axios.delete(`https://fakestoreapi.com/carts/${userId}`);

                console.log("DELETE request successful:", response.data);
                alert(`DELETE Request\nStatus code: ${response.status}`);
            } catch (error) {
                console.error("Error deleting product", error);
                alert(`DELETE Request\nFailed to delete product`);
            }
        });
    });
};


const addBtnClick = () => {
    const addBtns = document.querySelectorAll(".quantity-right-plus");

    addBtns.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const productId = event.target.dataset.productId;

            console.log(`Add button clicked for product ID: ${productId}`);

            try {
                const response = await axios.patch(`https://fakestoreapi.com/carts/${userId}`, {
                    products: [{ productId: productId, quantity: 1 }] // Fake update
                });

                console.log("PATCH request successful:", response.data);
                alert(`PATCH Request\nStatus code: ${response.status}`);
            } catch (error) {
                console.error("Error updating cart", error);
                alert(`PATCH Request\nFailed to update cart`);
            }
        });
    });
};


const minusBtnClick = () => {
    const minusBtns = document.querySelectorAll(".quantity-left-minus");

    minusBtns.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const productId = event.target.dataset.productId;

            console.log(`Minus button clicked for product ID: ${productId}`);

            try {
                // Fake PATCH request
                const response = await axios.patch(`https://fakestoreapi.com/carts/${userId}`, {
                    products: [{ productId: productId, quantity: 1 }] // Fake update
                });

                console.log("PATCH request successful:", response.data);
                alert(`PATCH Request\nStatus code: ${response.status}`);
            } catch (error) {
                console.error("Error updating cart", error);
                alert(`PATCH Request\nFailed to update cart`);
            }
        });
    });
};





const displayTotal = async (total, cartProducts) => {
    let totalPrice = 0;
    
    for (const product of cartProducts) {
        const productDetails = await getProductDetails(product.productId);
        totalPrice += product.quantity * productDetails.price;
    }
    
    // console.log(totalPrice);
    total.innerHTML = `<strong>Total :</strong><span> $ ${totalPrice}<span>`;

}


const getProductDetails = async (productId) => {
    try{
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`) ;
        return response.data;
    }
    catch(error){
        console.error("error:",error);
    };
};

const createCartProductCard = (quantity,productDetails) => {
    const productCard = document.createElement("li");
    productCard.className =
        "list-group-item d-flex justify-content-between align-items-start";

    productCard.innerHTML=`
        <div class="container">
            <div class="card shadow-sm border rounded-3 p-3">
                <div class="row">
                    <div class="col-md-6">
                        <img src="${productDetails.image}" id="product-image" class="img-fluid w-100" style="max-height:   120px; object-fit: contain;" alt="Product Image">
                    </div>
                    <div class="col-md-6 card-body border-start">
                        <h6 id="product-title">${productDetails.title}</h6>
                        <p><strong>Price:</strong> $<span id="product-price">${productDetails.price}</span></p>
                        <p><strong>Quantity:</strong> 
                            <span class="input-group-btn" id="minus">
                                <button type="button" class="quantity-left-minus btn btn-danger btn-number" data-type="minus" data-field=""
                                data-product-id="${productDetails.id}" 
                                    data-quantity="${quantity}">
                                    <span class="glyphicon glyphicon-minus">-</span>
                                </button>
                            </span> 
                            <span id="product-quantity">${quantity}</span>
                            <span class="input-group-btn" id="add">
                                <button type="button" class="quantity-right-plus btn btn-success btn-number" data-type="plus" data-field=""
                                data-product-id="${productDetails.id}" 
                                    data-quantity="${quantity}">
                                    <span class="glyphicon glyphicon-plus">+</span>
                                </button>
                            </span>
                        </p>
                        <button type="button"  class="delete-btn btn btn-danger" data-product-id="${productDetails.id}">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return productCard;
};