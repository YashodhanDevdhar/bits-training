const productImage = document.getElementById("product-image");
const productTitle = document.getElementById("product-title");
const productDescription = document.getElementById("product-description");
const productPrice = document.getElementById("product-price");
const addToCartBtn = document.querySelector(".add-to-cart");


const params = new URLSearchParams(window.location.search);
let productId = params.get("id");


const fetchData =async () => {
    try{
        const response =await axios.get(`https://fakestoreapi.com/products/${productId}`);
        addInfoIntoProductCard(response);
        addToCartBtnClick();
    }
    catch(error){
        console.error("Error : ",error)
    }
}

const addInfoIntoProductCard = (response)=>{
    productImage.src=response.data.image;
    productTitle.innerHTML = response.data.title;
    productDescription.innerHTML = response.data.description;
    productPrice.innerHTML = response.data.price;  
};

const addToCartBtnClick = () => {
    addToCartBtn.addEventListener("click", ()=>{
        addToCart(productId);
    });
};

if(!productId)
    console.log("Product id not found in the URL")
else
    fetchData();
