document.addEventListener("DOMContentLoaded", () => {
    const inputTodo = document.getElementById("input-todo");
    const buttonTodo = document.getElementById("button-todo");
    const ulTodo = document.getElementById("ul-todo");
  
    //delete all btn
    const deleteAll = document.querySelector(".btn-warning");
  
    //delete-all function
    deleteAll.addEventListener("click", (e) => {
      let userChoice = confirm("are you sure to delete the entire list ?");
      if (userChoice) {
        ulTodo.remove();
        saveAllTodo();
      }
    });
  
    buttonTodo.addEventListener("click", () => {
      const text = inputTodo.value;
      createTodo(text);
      inputTodo.value = "";
      saveAllTodo();
    });
  
    const createTodo = (task) => {
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-start";
      li.innerHTML = `<span class="text-todo">${task}</span>
      <div class="btn-group" role="group" aria-label="Basic mixed styles example">
        <button type="button" class="btn btn-danger">Edit</button>
        <button type="button" class="btn btn-warning">Delete</button>
      </div>`;
      ulTodo.appendChild(li);
    };
  
    ulTodo.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-warning")) {
        e.target.closest(".list-group-item").remove();
        saveAllTodo();
      }
  
      if (e.target.classList.contains("btn-danger")) {
        const li = e.target.closest(".list-group-item");
        const span = li.querySelector(".text-todo");
        const taskText = span.textContent;
  
        const inputEdit = document.createElement("input");
        inputEdit.className = "edit-text";
        inputEdit.type = "text";
        inputEdit.value = taskText;
  
        //replace the span with the inputEdit
        li.replaceChild(inputEdit, span);
        inputEdit.focus();
  
        inputEdit.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            const newTextVal = inputEdit.value.trim();
            if (newTextVal !== "") {
              span.textContent = newTextVal;
              li.replaceChild(span, inputEdit);
              saveAllTodo();
            }
          }
        });
  
        
      }
    });
  
    const saveAllTodo = () => {
      const allTodos = [...document.querySelectorAll(".text-todo")].map(
        (task) => task.textContent
      );
  
      localStorage.setItem("allTodos", JSON.stringify(allTodos));
    };
  
    const loadAllTodo = () => {
      const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
      allTodos.forEach((task) => createTodo(task));
    };
  
    loadAllTodo();
  });
  