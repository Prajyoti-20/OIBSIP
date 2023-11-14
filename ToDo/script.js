const input = document.querySelector(".todo-input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
let todosJson = [];
addButton.addEventListener("click", addTodo);
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const taskName = input.value.trim();
  if (taskName) {
    const newTask = { name: taskName, status: "pending" };
    todosJson.push(newTask);
    updateTodosView();
    input.value = ""; 
  }
}

function updateTodosView() {
  todosHtml.innerHTML = ""; 
  todosJson.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <label>
        <input type="checkbox" class="status-checkbox" data-index="${index}" ${task.status === "completed" ? "checked" : ""}>
        <span class="${task.status}">${task.name}</span>
      </label>
      <i class="fas fa-trash delete-button" data-index="${index}" style="color: white;"></i> <!-- Use fas class for solid trash icon -->
    `;
    listItem.classList.add("task-item");
    todosHtml.appendChild(listItem);
  });

  const statusCheckboxes = document.querySelectorAll(".status-checkbox");
  statusCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateStatus);
  });

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteTask);
  });
}

function updateStatus(event) {
  const index = event.target.getAttribute("data-index");
  todosJson[index].status = event.target.checked ? "completed" : "pending";
  updateTodosView();
}

function deleteTask(event) {
  const index = event.target.getAttribute("data-index");
  todosJson.splice(index, 1);
  updateTodosView();
}

updateTodosView();
