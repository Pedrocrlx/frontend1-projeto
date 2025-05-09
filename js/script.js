import { getTasks, addTask, deleteTask, updateTask } from './api.js';

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
    taskList.innerHTML = '';

    tasks.forEach(task => {
        localStorage.setItem(`${task.id}`, task.taskTitle);
        const li = document.createElement('li');
        const taskDate = new Date(task.createdAt).toLocaleDateString('pt-PT', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        li.innerHTML = `
        <div class="tasks">
            <p class="taskTitle" id="${task.id}">${task.taskTitle}</p>
            <p class="taskDescription" id="${task.id}">${task.taskDescription}</p>
            <p class="taskDate">${taskDate}</p>
            <div class="taskFooter">
                <span class="material-symbols-outlined delete">delete</span>
                <span id="edit" class="material-symbols-outlined edit">edit</span>
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

        await deleteTask(taskId);
        localStorage.removeItem(`${taskId}`);

        const tasks = await getTasks();
        displayTasks(tasks);
    }
});

/**
 * Handles click events on the task list.
 * Specifically listens for clicks on edit buttons and opens the edit modal.
 */
document.getElementById('todo-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('edit')) {
        const taskItem = event.target.closest('li');
        const taskId = taskItem.querySelector('.taskTitle').id;
        const taskTitle = taskItem.querySelector('.taskTitle').textContent;
        const taskDescription = taskItem.querySelector('.taskDescription').textContent;

        document.getElementById('edit-task-title').value = taskTitle;
        document.getElementById('edit-task-description').value = taskDescription;
        document.getElementById('edit-task-form').setAttribute('data-task-id', taskId);

        const editModal = new bootstrap.Modal(document.getElementById('editTaskModal'));
        editModal.show();
    }
});

/**
 * Handles form submission for editing a task.
 * It updates the task in the API and refreshes the task list.
 */
document.getElementById('edit-task-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const taskId = event.target.getAttribute('data-task-id');
    const updatedTask = {
        taskTitle: document.getElementById('edit-task-title').value,
        taskDescription: document.getElementById('edit-task-description').value,
    };


    const response = await updateTask(taskId, updatedTask);

    if (response) {
        const tasks = await getTasks();
        displayTasks(tasks);
    } else {
        console.error('Error updating task');
    }

    const editModal = bootstrap.Modal.getInstance(document.getElementById('editTaskModal'));
    editModal.hide();
});


// Event listener for form submission (ADD NEW TASK)
document.getElementById('todo-form').addEventListener('submit', async (event) => {
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

    document.getElementById('todo-title').value = '';
    document.getElementById('todo-description').value = '';

    const modal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
    modal.hide();
});
