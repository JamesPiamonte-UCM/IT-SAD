document.getElementById("user-name").textContent = "John Doe";

// ===== TASKS ARRAY =====
let tasksArray = [];

// ===== DOM ELEMENTS =====
const taskInput = document.getElementById("taskInput");
const taskPriority = document.getElementById("taskPriority");
const addBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const pendingStat = document.querySelector(".stat-pendingtask strong");
const completedStat = document.querySelector(".stat-completedtask strong");
const createdStat = document.querySelector(".stat-taskcreated strong");

// ===== LOAD TASKS FROM LOCALSTORAGE =====
function loadTasks() {
    const stored = localStorage.getItem("tasks");
    if (stored) tasksArray = JSON.parse(stored);
}

// ===== SAVE TASKS TO LOCALSTORAGE =====
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

// ===== UPDATE STATS =====
function updateStats() {
    const createdCount = tasksArray.length;
    const completedCount = tasksArray.filter(t => t.status === "completed").length;
    const pendingCount = tasksArray.filter(t => t.status === "pending").length;

    pendingStat.textContent = pendingCount;
    completedStat.textContent = completedCount;
    createdStat.textContent = createdCount;
}

// ===== RENDER TASK LIST =====
function renderTasks() {
    taskList.innerHTML = "";

    tasksArray.forEach(task => {
        // Only render tasks that are pending
        if(task.status === "pending") {
            const card = document.createElement("div");
            card.classList.add("task-card");
            card.dataset.id = task.id;

            const priorityClass = {
                Low: "priority-low",
                Medium: "priority-medium",
                High: "priority-high"
            }[task.priority];

            card.innerHTML = `
                <div class="task-header">
                    <span class="task-text">${task.text}</span>
                    <span class="task-priority ${priorityClass}">${task.priority}</span>
                    <span class="task-date">${task.date}</span>
                </div>
                <div class="task-actions">
                    <button class="done-btn">✔</button>
                    <button class="edit-btn">✎</button>
                    <button class="delete-btn">🗑</button>
                </div>
            `;

            taskList.appendChild(card);
        }
    });
}

// ===== ADD TASK =====
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return alert("Please enter a task!");

    const newTask = {
        id: Date.now(),
        text,
        priority: taskPriority.value,
        date: new Date().toLocaleDateString(),
        status: "pending"
    };

    tasksArray.push(newTask);
    saveTasks();
    renderTasks();
    updateStats();
    taskInput.value = "";
});

// ===== TASK LIST ACTIONS =====
taskList.addEventListener("click", (e) => {
    const card = e.target.closest(".task-card");
    if (!card) return;

    const taskId = Number(card.dataset.id);
    const taskIndex = tasksArray.findIndex(t => t.id === taskId);
    if(taskIndex === -1) return;

    // ===== COMPLETE TASK =====
    if (e.target.classList.contains("done-btn")) {
        tasksArray[taskIndex].status = "completed"; // mark as completed
        saveTasks();
        card.remove(); // disappear from list
        updateStats();
        alert("Task accomplished!");
        return;
    }

    // ===== DELETE TASK =====
    if (e.target.classList.contains("delete-btn")) {
        if(confirm("Delete this task?")) {
            tasksArray.splice(taskIndex, 1); // remove from array
            saveTasks();
            renderTasks();
            updateStats();
        }
        return;
    }

    // ===== EDIT TASK =====
    if (e.target.classList.contains("edit-btn")) {
        const newText = prompt("Edit task:", tasksArray[taskIndex].text);
        const newPriority = prompt("New priority (Low, Medium, High):", tasksArray[taskIndex].priority);

        if(newText && newText.trim()) tasksArray[taskIndex].text = newText.trim();
        if(["Low","Medium","High"].includes(newPriority)) tasksArray[taskIndex].priority = newPriority;

        saveTasks();
        renderTasks();
        updateStats();
    }
});



// ===== INITIALIZE =====
loadTasks();
renderTasks();
updateStats();
