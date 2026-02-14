let todos = [];
let editIndex = -1;

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const filter = document.getElementById("filter");
const deleteAll = document.getElementById("deleteAll");

// Add or Edit Todo
addBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (text === "") return alert("Enter todo");

  if (editIndex === -1) {
    todos.push({ text, completed: false });
  } else {
    todos[editIndex].text = text;
    editIndex = -1;
    addBtn.textContent = "Add";
  }

  todoInput.value = "";
  renderTodos();
});

// Render Todos
function renderTodos() {
  todoList.innerHTML = "";

  let filteredTodos = todos.filter(todo => {
    if (filter.value === "completed") return todo.completed;
    if (filter.value === "inprogress") return !todo.completed;
    return true;
  });

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    if (todo.completed) li.classList.add("completed");

    li.innerHTML = `
      <div>
        <input type="checkbox" ${todo.completed ? "checked" : ""} 
        onchange="toggleStatus(${index})">
        <span>${todo.text}</span>
      </div>

      <div class="actions">
        <button onclick="editTodo(${index})">Edit</button>
        <button onclick="deleteTodo(${index})">Delete</button>
        <button onclick="toggleStatus(${index})">Toggle</button>
      </div>
    `;

    todoList.appendChild(li);
  });
}

// Delete One
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

// Toggle Status
function toggleStatus(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

// Edit Todo
function editTodo(index) {
  todoInput.value = todos[index].text;
  editIndex = index;
  addBtn.textContent = "Edit";
}

// Filter
filter.addEventListener("change", renderTodos);

// Delete All
deleteAll.addEventListener("click", () => {
  if (confirm("Delete all todos?")) {
    todos = [];
    renderTodos();
  }
});