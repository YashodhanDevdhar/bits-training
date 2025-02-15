const productImage = document.getElementById("product-image")as HTMLImageElement;
const productTitle = document.getElementById("product-title")as HTMLElement;
const productDescription = document.getElementById("product-description")as HTMLElement;
const productPrice = document.getElementById("product-price")as HTMLElement;
const addToCartBtn = document.querySelector(".add-to-cart")as HTMLButtonElement;

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    image: string;
}

const params =new URLSearchParams(window.location.search);
let productId = params.get("id");

const addInfoProductCard = (product : Product) => {
    productImage.src = product.image;
    productTitle.innerHTML = product.title;
    productDescription.innerHTML = product.description;
    productPrice.innerHTML = `${product.price}`;
};

const addToCartBtnClick = ():void => {
    addToCartBtn.addEventListener("click",()=>{
        console.log(productId);
    });
};

const fetchData = async() : Promise<void> => {
    try{
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        addInfoProductCard(response.data);
        addToCartBtnClick();
    }
    catch(error){
        console.error("Error : ",error);
    };
};

if(!productId)
    console.log("Product id not found in the URL")
else
    fetchData();