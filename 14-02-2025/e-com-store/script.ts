// import axios from "axios";
declare const axios: any;

const productsContainer = document.getElementById("products")as HTMLElement;

document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
});

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

const linkViewDetailsBtn = () : void => {
    const viewDetailsBtn = document.querySelectorAll<HTMLButtonElement>(".view-details");
    viewDetailsBtn.forEach((button) => {
        button.addEventListener("click", (event : Event)=>{
            const target = event.target as HTMLButtonElement;
            const productId = target.getAttribute("data-id");
            if(productId){
                window.location.href = `product.html?id=${productId}`;
            }
        });
    });
};

const linkAddToCartBtn = () : void => {
    const addToCartBtn = document.querySelectorAll<HTMLButtonElement>(".add-to-cart");
    addToCartBtn.forEach((button)=>{
        button.addEventListener("click",(event : Event)=>{
            const target = event.target as HTMLButtonElement;
            const productId = target.getAttribute("data-id");
            if(productId){
                console.log(productId);
            }
        });
    });
};

const createProductCard = (product: Product) : HTMLDivElement => {
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

const displayProducts = (products: Product[]): void => {
    if(!productsContainer) return;

    products.forEach((product)=>{
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
    linkViewDetailsBtn();
    linkAddToCartBtn();
  };

const fetchProducts = async (): Promise<void> => {
    try{
        const response = await axios.get("https://fakestoreapi.com/products");
        displayProducts(response.data);
    }
    catch(error){
        console.error("Error fetching page:",error);
    };
};



