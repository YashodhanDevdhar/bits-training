document.addEventListener("DOMContentLoaded", () => {
    const inputTodo = document.getElementById("input-todo");
    const buttonTodo = document.getElementById("button-todo");
    const ulTodo = document.getElementById("ul-todo");

    //delete all btn
    const deleteAll = document.querySelector(".btn-warning");

    //delete-all function
    deleteAll.addEventListener("click", (e) => {
        let userChoice = confirm("Are you sure you want to delete the entire list?");
        if (userChoice) {
            ulTodo.innerHTML = '';  
            saveAllTodo();
        }
    });

    buttonTodo.addEventListener("click", () => {
        const text = inputTodo.value;
        if (text) {
            createTodo(text);
            inputTodo.value = "";
            saveAllTodo();
        }
    });

    const createTodo = (task) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-start";
        li.draggable = true;  // Make the item draggable
        li.innerHTML = `<span class="text-todo">${task}</span>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-danger">Edit</button>
            <button type="button" class="btn btn-warning">Delete</button>
        </div>`;
        ulTodo.appendChild(li);

        // Add event listener for dragstart
        li.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", li.innerHTML);
            li.classList.add("dragging");
        });

        li.addEventListener("dragend", () => {
            li.classList.remove("dragging");
        });
    };

    // Handle the drag and drop functionality
    ulTodo.addEventListener("dragover", (e) => {
        e.preventDefault();
        const draggingItem = document.querySelector(".dragging");
        const afterElement = getDragAfterElement(ulTodo, e.clientY);
        if (afterElement == null) {
            ulTodo.appendChild(draggingItem);
        } else {
            ulTodo.insertBefore(draggingItem, afterElement);
        }
    });

    const getDragAfterElement = (list, y) => {
        const draggableElements = [...list.querySelectorAll("li:not(.dragging)")];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
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
