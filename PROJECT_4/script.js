const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");
const clearAllBtn = document.querySelector("#clearAll");
const filterButtons = document.querySelectorAll(".filters button");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Render tasks
const renderTodos = (filter = "all") => {
  toDoBox.innerHTML = "";
  let filtered = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "completed") return todo.done;
    return true;
  });

  filtered.forEach((todo, index) => {
    const listItem = document.createElement("li");
    listItem.className = todo.done ? "done" : "";
    listItem.innerHTML = `
      ${todo.text}
      <i class="fas fa-times"></i>
    `;

    // Toggle done
    listItem.addEventListener("click", function () {
      todos[index].done = !todos[index].done;
      saveAndRender(filter);
    });

    // Delete task
    listItem.querySelector("i").addEventListener("click", function (e) {
      e.stopPropagation();
      todos.splice(index, 1);
      saveAndRender(filter);
    });

    toDoBox.appendChild(listItem);
  });
};

// Save to local storage
const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Add task
item.addEventListener("keyup", function (event) {
  if (event.key === "Enter" && this.value.trim() !== "") {
    todos.push({ text: this.value.trim(), done: false });
    this.value = "";
    saveAndRender();
  }
});

// Clear all tasks
clearAllBtn.addEventListener("click", () => {
  todos = [];
  saveAndRender();
});

// Filters
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filters .active").classList.remove("active");
    btn.classList.add("active");
    renderTodos(btn.dataset.filter);
  });
});

// Save + render shortcut
const saveAndRender = (filter = "all") => {
  saveTodos();
  renderTodos(filter);
};

// Initial render
renderTodos();
