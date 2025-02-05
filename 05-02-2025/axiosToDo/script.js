document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const ulTodo = document.getElementById("ul-todo");
  const deleteAll = document.querySelector(".btn-warning");

  const buttonFetchTodo = document.getElementById("button-fetch-todo");
  const buttonPost = document.getElementById("button-post");

  buttonFetchTodo.addEventListener("click", () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        const randomTodo =
          response.data[Math.floor(Math.random() * response.data.length)];
        createTodo(randomTodo.title);
      })
      .catch((error) => console.error("Error fetching task:", error));
  });

  buttonPost.addEventListener("click", () => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title: inputTodo.value,
        completed: false,
      })
      .then((res) => {
        alert(
          `The POST request responded with status: ${
            res.status
          } with data: ${JSON.stringify(res.data, null, 2)}`
        );
        inputTodo.value = "";
      })
      .catch((error) => alert(error));
  });

  deleteAll.addEventListener("click", (e) => {
    let userChoice = confirm(
      "Are you sure you want to delete the entire list?"
    );
    if (userChoice) {
      ulTodo.innerHTML = "";
        // saveAllTodo();
    }
  });

  buttonTodo.addEventListener("click", () => {
    const text = inputTodo.value;
    if (text) {
      createTodo(text);
      inputTodo.value = "";
        // saveAllTodo();
    }
  });

  const createTodo = (task) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-start";
    li.draggable = true;
    li.innerHTML = `<span class="text-todo">${task}</span>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-danger">Put/Patch</button>
            <button type="button" class="btn btn-warning">Delete</button>
        </div>`;
    ulTodo.appendChild(li);

    li.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", li.innerHTML);
      li.classList.add("dragging");
    });

    li.addEventListener("dragend", () => {
      li.classList.remove("dragging");
    });
  };

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
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  };

  ulTodo.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-warning")) {
      e.target.closest(".list-group-item").remove();
      //   saveAllTodo();

      axios
        .delete("https://jsonplaceholder.typicode.com/todos/1")
        .then((res) => alert(`status : ${res.status}`))
        .catch((err) => alert(err));
    }

    if (e.target.classList.contains("btn-danger")) {
      const li = e.target.closest(".list-group-item");
      const span = li.querySelector(".text-todo");
      const taskText = span.textContent;

      const inputEdit = document.createElement("input");
      inputEdit.className = "edit-text";
      inputEdit.type = "text";
      inputEdit.value = taskText;

      li.replaceChild(inputEdit, span);
      inputEdit.focus();

      inputEdit.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const newTextVal = inputEdit.value.trim();

          axios
            .patch("https://jsonplaceholder.typicode.com/todos/1", {
              title: newTextVal,
              completed: true,
            })
            .then((res) =>
              alert(
                `The Put/Patch request responded with status: ${
                  res.status
                } with updated title : ${res.data.title}`
              )
            )
            .catch((err) => alert(err));

          if (newTextVal !== "") {
            span.textContent = newTextVal;
            li.replaceChild(span, inputEdit);
            // saveAllTodo();
          } else {
            li.replaceChild(span, inputEdit);
          }
        }
        if (e.key === "Escape") {
          li.replaceChild(span, inputEdit);
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
