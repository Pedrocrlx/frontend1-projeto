const API = "https://6819013d5a4b07b9d1d1a725.mockapi.io/todo";

// It takes a task object as an argument and sends a POST request to the API
export const getTasks = async () => {
    const response = await fetch(API + "/tasks");
    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }
    const data = await response.json();
    return data;
}

// This function is used to add a new task to the API
export const addTask = async (task) => {
    const response = await fetch(API + "/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });
    if (!response.ok) {
        throw new Error("Failed to add task");
    }
    const data = await response.json();
    return data;
}

// This function is used to delete a task from the API
// It takes the task ID as an argument and sends a DELETE request to the API
export const deleteTask = async (id) => {
    const response = await fetch(API + "/tasks/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};

export const updateTask = async (taskId, updatedTask) => {
    const response = await fetch(`${API}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
        throw new Error('Failed to update task');
    }

    return await response.json();
};