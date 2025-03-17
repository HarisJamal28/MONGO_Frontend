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
            ${task.title} - ${task.description}
            <button onclick="deleteTask('${task._id}')">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Add new task
document.getElementById("task-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    });

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    
    fetchTasks();
});

// Delete task
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

// Initial fetch
fetchTasks();
