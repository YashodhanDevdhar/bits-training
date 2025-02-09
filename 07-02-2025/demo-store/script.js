const productsContainer = document.getElementById("products");


document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

const fetchProducts = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    displayProducts(response.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const displayProducts = (products) => {
  products.forEach((product) => {
    const productCard = createProductCard(product);

    productsContainer.appendChild(productCard);
  });

  linkViewDetailsBtn();

  linkAddToCartBtn();
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

const linkViewDetailsBtn = () => {
  const viewDetailsBtn = document.querySelectorAll(".view-details");
  viewDetailsBtn.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      window.location.href = `product.html?id=${productId}`;
    });
  });
};

const linkAddToCartBtn = () => {
  const addToCartBtn = document.querySelectorAll(".add-to-cart");
  addToCartBtn.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productId = event.target.getAttribute("data-id");
      addToCart(productId);
    });
  });
};
