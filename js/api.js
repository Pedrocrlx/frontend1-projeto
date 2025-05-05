const API = "https://6819013d5a4b07b9d1d1a725.mockapi.io/todo";

export const getTasks = async () => {
    const response = await fetch(API + "/tasks");
    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }
    const data = await response.json();
    console.log(data);
    return data;
}

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