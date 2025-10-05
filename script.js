// Get elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// --- Load tasks from local storage when page loads ---
window.onload = loadTasks;

// Function to save tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach((task) => {
    createTask(task.text, task.completed);
  });
}

// Function to create a new task element
function createTask(taskText, isCompleted = false) {
  const li = document.createElement("li");

  // Task content
  li.innerHTML = `
    <input type="checkbox" class="task-check" ${isCompleted ? "checked" : ""}/>
    <span>${taskText}</span>
    <div class="task-actions">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  // --- Mark Complete ---
  const checkbox = li.querySelector(".task-check");
  if (isCompleted) li.classList.add("completed");
  checkbox.addEventListener("change", function () {
    li.classList.toggle("completed");
    saveTasks();
  });

  // --- Edit Task ---
  const editBtn = li.querySelector(".edit-btn");
  editBtn.addEventListener("click", function () {
    const span = li.querySelector("span");
    const newTask = prompt("Edit your task:", span.textContent);
    if (newTask && newTask.trim() !== "") {
      span.textContent = newTask.trim();
      saveTasks();
    }
  });

  // --- Delete Task ---
  const deleteBtn = li.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", function () {
    li.remove();
    saveTasks();
  });

  // Add task to list
  taskList.appendChild(li);

  // Save to local storage
  saveTasks();
}

// Function to add new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Task cannot be empty!");
    return;
  }
  createTask(taskText);
  taskInput.value = "";
}

// Add with button
addTaskBtn.addEventListener("click", addTask);

// Add with Enter key
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
