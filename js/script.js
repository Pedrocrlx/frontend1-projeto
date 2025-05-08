import { getTasks, addTask, deleteTask } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const tasks = await getTasks();
    displayTasks(tasks);
    setInterval(updateClock, 1000); // update clock every second
});

/**
 * Updates the clock displayed on the page every second.
 */
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

/**
 * Displays the list of tasks in the DOM.
 * 
 * @param {Array} tasks - Array of task objects to be displayed.
 * Each task object should have the followin g structure:
 * { id: string, taskTitle: string }
 */
function displayTasks(tasks) {
    const taskList = document.getElementById('todo-list');
    // Clears the task list before rendering
    taskList.innerHTML = '';

    tasks.forEach(task => {
        localStorage.setItem(`${task.id}`, task.taskTitle);
        const li = document.createElement('li');
        li.innerHTML = `
        <div class="tasks">
            <p class="taskTitle" id="${task.id}">${task.taskTitle}</p>
            <p class="taskDescription" id="${task.id}">${task.taskDescription}</p>
            <div class="taskFooter">
                <span class="material-symbols-outlined delete">delete</span>
                <span class="material-symbols-outlined edit">edit</span>

            </div>
        </div>
        
        `;
        taskList.append(li);
    });
}

/**
 * Handles click events on the task list.
 * Specifically listens for clicks on delete buttons and removes the corresponding task.
 */
document.getElementById('todo-list').addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete')) {
        const taskItem = event.target.closest('li');
        const taskId = taskItem.querySelector('p').id;

        // Deletes the task from the API
        await deleteTask(taskId);
        // Deletes the task from the local storage
        localStorage.removeItem(`${taskId}`);
        // Optionally, refresh the task list without reloading the page
        const tasks = await getTasks();
        displayTasks(tasks);
    }
});

// Event listener for form submission (ADD NEW TASK)
document.addEventListener('submit', async (event) => {
    event.preventDefault();

    const task = {
        taskTitle: document.getElementById('todo-title').value,
        taskDescription: document.getElementById('todo-description').value,
    };

    const response = await addTask(task);

    if (response) {
        const tasks = await getTasks();
        displayTasks(tasks);
    } else {
        console.error('Error adding task');
    }

    // Clear the input field after adding the task
    document.getElementById('todo-title').value = '';
    document.getElementById('todo-description').value = '';

});

