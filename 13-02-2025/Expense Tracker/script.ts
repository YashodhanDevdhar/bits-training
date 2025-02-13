

interface Expense{
    description : string,
    amount : number,
    category : string,
    date : string
}

enum Categories {
    FOOD = "Food",
    TRAVEL = "Travel",
    BILLS = "Bills",
    SHOPPING = "Shopping"
}

let expenses : Expense[] = [];

const description = document.getElementById("description")as HTMLInputElement;
const amount = document.getElementById("amount")as HTMLInputElement;
const category = document.getElementById("category")as HTMLSelectElement;
const date = document.getElementById("date")as HTMLInputElement;
const addButton = document.getElementById("addBtn") as HTMLButtonElement;
const tableBody = document.getElementById("expense-table-body") as HTMLTableSectionElement;
const filter = document.getElementById("filter-category") as HTMLSelectElement;
const totalExpenses = document.getElementById("total-expenses") as HTMLElement;

loadExpensesFromLocalStorage();


function loadExpensesFromLocalStorage() {
    let data = localStorage.getItem("expenses")
    if(data){
        expenses = JSON.parse(data);
    }
    renderExpenses();
};


addButton.addEventListener("click",()=>{
    addExpense();
    saveExpenseToLocalStorage();
    renderExpenses();
    clearForm();
});

function addExpense() {
    const descriptionData = description.value;
    const amountData = parseInt(amount.value) ;
    const categoryData = category.value;
    const dateData = date.value;
    if(descriptionData === "" || amountData ===0 || categoryData==="" || dateData ===""){
        alert("there should be no empty field");
    }else{

        const expenseObj : Expense = {
            description : descriptionData,
            amount : amountData,
            category : categoryData,
            date : dateData
        }
    
        expenses.push(expenseObj);
    }
};

function saveExpenseToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
};


function renderExpenses() {
    tableBody.innerHTML = "";

    const selectedCategory = filter.value;
    const filteredExpenses = (selectedCategory === "All" || selectedCategory === "") ? expenses : expenses.filter(expense => expense.category === selectedCategory);

    filteredExpenses.forEach((element,index) => {
        const tr =document.createElement("tr");
        tr.innerHTML = `
            <td>${element.description}</td>
            <td>${element.amount}</td>
            <td>${element.category}</td>
            <td>${element.date}</td>
            <td><button data-index="${index}" type="button" class="btn btn-primary w-50">Delete</button></td>
        `;
        tableBody.appendChild(tr);
    });
    deleteExpense(filteredExpenses)
    calculateTotalExpense(filteredExpenses);
    
};

function clearForm() {
    description.value = "";
    amount.value = "";
    category.selectedIndex = 0;
    date.value = "";
}

function calculateTotalExpense(filteredExpenses : Expense[]) {
    let total = filteredExpenses.reduce((sum, element) => sum + element.amount, 0);
    totalExpenses.innerHTML = `Total Expenses: ₹${total}`;
};

filter.addEventListener("change",renderExpenses);

function deleteExpense(filteredExpenses : Expense[])  {
    tableBody.addEventListener("click", (event)=>{
        const target = event.target as HTMLElement;
        if(target.tagName === "BUTTON" && target.hasAttribute("data-index")){
            const dataIndex = parseInt( target.getAttribute("data-index") !);
            const expenseToDelete = filteredExpenses[dataIndex];
            const actualIndex = expenses.findIndex(exp => exp === expenseToDelete);
            if(actualIndex !== -1){
                expenses.splice(dataIndex,1);
                saveExpenseToLocalStorage();
                renderExpenses();
            }
            
        }
    });
};

