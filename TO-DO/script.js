const container = document.getElementById("container");
const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");

// 🔢 Update numbering
function updateNumbers() {
    const todos = container.querySelectorAll(".todo");

    todos.forEach((todo, index) => {
        const span = todo.querySelector("span");
        const text = span.dataset.text;
        span.innerText = (index + 1) + ". " + text;
    });
}

// ➕ Add Task
addBtn.addEventListener("click", function () {

    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const todo = document.createElement("div");
    todo.classList.add("todo");

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.dataset.text = taskText;
    span.innerText = taskText;

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    todo.appendChild(leftDiv);

    container.appendChild(todo);

    taskInput.value = "";

    updateNumbers();
});

// ☑ Checkbox Logic (Strike → Fade → Remove)
document.addEventListener("change", function (e) {

    if (e.target.type === "checkbox") {

        const todo = e.target.closest(".todo");

        // Step 1: Add strike-through
        todo.classList.add("completed");

        // Step 2: Wait a little then fade out
        setTimeout(() => {
            todo.classList.add("fade-out");
        }, 300);

        // Step 3: Remove after animation
        setTimeout(() => {
            todo.remove();
            updateNumbers();
        }, 700);
    }

});

// ⌨ Enter key → Add Task
taskInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") addBtn.click();
});