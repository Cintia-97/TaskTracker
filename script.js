document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let task = { text: taskText, done: false };
    let tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);

    renderTask(task);
    taskInput.value = "";
}

function renderTask(task) {
    let li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" ${task.done ? "checked" : ""} onchange="toggleTask(this)">
        <span class="${task.done ? "done" : ""}">${task.text}</span>
        <button onclick="removeTask(this)">❌</button>
    `;
    document.getElementById("taskList").appendChild(li);
}

function toggleTask(checkbox) {
    let span = checkbox.nextElementSibling;
    let tasks = getTasks();
    let taskText = span.textContent;

    tasks.forEach(task => {
        if (task.text === taskText) {
            task.done = checkbox.checked;
        }
    });

    saveTasks(tasks);
    span.classList.toggle("done", checkbox.checked);
}

function removeTask(button) {
    let li = button.parentElement;
    let taskText = li.querySelector("span").textContent;
    let tasks = getTasks().filter(task => task.text !== taskText);

    saveTasks(tasks);
    li.remove();
}

function filterTasks() {
    let filter = document.getElementById("filter").value;
    let tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
        let isDone = task.querySelector("input").checked;

        if (filter === "all") {
            task.style.display = "flex";
        } else if (filter === "done" && isDone) {
            task.style.display = "flex";
        } else if (filter === "not-done" && !isDone) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function loadTasks() {
    let tasks = getTasks();
    tasks.forEach(renderTask);
}

document.getElementById("taskInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
     addTask();
    }
});