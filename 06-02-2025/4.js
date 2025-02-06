const products = [
  { name: "Smartphone", price: 699, category: "Electronics" },
  { name: "Laptop", price: 1299, category: "Electronics" },
  { name: "Headphones", price: 199, category: "Electronics" },
  { name: "Washing Machine", price: 499, category: "Home Appliances" },
  { name: "Refrigerator", price: 899, category: "Home Appliances" },
  { name: "Microwave Oven", price: 250, category: "Home Appliances" },
  { name: "T-Shirt", price: 25, category: "Clothing" },
  { name: "Jeans", price: 50, category: "Clothing" },
  { name: "Running Shoes", price: 80, category: "Footwear" },
  { name: "Office Chair", price: 150, category: "Furniture" },
];

// Task 1: 
const products1 = products.map(product => {
    return {
        name: product.name.toUpperCase(),
        price: product.price,
        category: product.category
    };
});

console.log(products1);

// Task 2: 
const electronicProducts = products.filter(product => {
    if(product.category === "Electronics")
        return product;
})

console.log(electronicProducts);

// Task 3: 
const totalPrice = products.reduce((total,current,i,products)=>{
    return total += current.price;
},0)

console.log(totalPrice);

// Task 4: 
function totalPriceOfElectronicProducts(){
    const electronicProducts = products.filter(product => {
        if(product.category === "Electronics")
            return product;
    })

    const totalPrice = electronicProducts.reduce((total,current,i,products)=>{
        return total += current.price;
    },0)

    return totalPrice
};

console.log(totalPriceOfElectronicProducts());