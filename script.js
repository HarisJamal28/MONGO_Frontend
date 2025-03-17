const API_URL = "https://mongo-backend-silk.vercel.app/api/items";

// Fetch and display tasks
async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span id="task-${task._id}">${task.title} - ${task.description}</span>
            <div class="buttons_grid">
            <button onclick="editTask('${task._id}', '${task.title}', '${task.description}')">Edit</button>
            <button onclick="deleteTask('${task._id}')">Delete</button>
            </div>

        `;
        taskList.appendChild(li);
    });
}

// Add or Update task
document.getElementById("task-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const taskId = document.getElementById("task-id").value;

    if (taskId) {
        // Update Task
        await fetch(`${API_URL}/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description })
        });
    } else {
        // Create New Task
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description })
        });
    }

    // Clear Form & Fetch Updated List
    document.getElementById("task-form").reset();
    document.getElementById("task-id").value = "";
    
    fetchTasks();
});

// Delete task
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

// Edit Task - Populate Form
function editTask(id, title, description) {
    document.getElementById("title").value = title;
    document.getElementById("description").value = description;
    document.getElementById("task-id").value = id;
}

// Initial fetch
fetchTasks();
