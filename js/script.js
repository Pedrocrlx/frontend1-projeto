import { getTasks, addTask, deleteTask } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const tasks = await getTasks();
    displayTasks(tasks);
});

function displayTasks(tasks) {
    const taskList = document.getElementById('todo-list');
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox">
            <label id="${task.id}">${task.taskTitle}</label>
            <button type="submit" class="delete">Delete</button>
        `;
        taskList.append(li);
    });
}


//TENS QUE VER COMO PODES FAZER UM EVENTLISTENER ESPECIFICO PARA O BOTÃO DELETE


// const deleteTaskById = document.getElementById('delete');
// deleteTaskById.addEventListener('submit', async (event) => {
//     if (event.target.classList.contains('delete')) {
//         const taskItem = event.target.parentNode;
//         const taskId = taskItem.querySelector('label').id;
//         await deleteTask(taskId);
//     }
//     console.log("apagaou");
//     location.reload();
// });

document.addEventListener('submit', async (add) => {
    add.preventDefault();
    const task = {
        taskTitle: document.getElementById('todo-input').value,
    };
    const response = await addTask(task);
    console.log(response);
    location.reload();
});

