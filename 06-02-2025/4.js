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
const products1 = products.map((product) => {
  return {
    name: product.name.toUpperCase(),
    price: product.price,
    category: product.category,
  };
});

console.log(`Product titles in uppercase : ${products1}`);

// Task 2:
const electronicProducts = products.filter(
  (product) => product.category === "Electronics"
);

console.log("Electoronic products are : ", electronicProducts);

// Task 3:
const totalPrice = products.reduce(
  (total, current, i, products) => (total += current.price),
  0
);

console.log(`total price : ${totalPrice}`);

// Task 4:
function totalPriceOfCategory(category) {
  return products
    .filter((product) => product.category === category)
    .map((product) => product.price)
    .reduce((sum, current) => sum + current, 0);
}

console.log(
  `Total price of electronics is : ${totalPriceOfCategory("Electronics")}`
);
