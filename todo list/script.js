document.getElementById('addTaskButton').addEventListener('click', function () {
    const taskInput = document.getElementById('newTaskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText !== '') {
        addTask(taskText, priority);
        taskInput.value = ''; // Clear input
    }
});

function addTask(taskText, priority) {
    // Select the correct section based on priority
    let taskList;
    if (priority === 'High') {
        taskList = document.getElementById('highPriorityList');
    } else if (priority === 'Medium') {
        taskList = document.getElementById('mediumPriorityList');
    } else {
        taskList = document.getElementById('lowPriorityList');
    }

    const taskItem = document.createElement('li');
    taskItem.classList.add('task', priority.toLowerCase());

    const taskContent = document.createElement('div');
    taskContent.style.textAlign = 'left';

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText ;
    taskContent.appendChild(taskSpan);

    const priorityLabel = document.createElement('strong');
    priorityLabel.textContent = `[${priority} Priority]`;
    priorityLabel.classList.add('priority-label');
    taskContent.appendChild(priorityLabel);

    taskContent.appendChild(document.createElement('br'));

    const timestamp = document.createElement('small');
    const now = new Date();
    timestamp.textContent = `Created: ${now.toLocaleString()}`;
    timestamp.classList.add('timestamp');
    taskContent.appendChild(timestamp);
    timestamp.style.color = '#57102C';

    taskItem.appendChild(taskContent);

    // Buttons
    const completeButton = document.createElement('button');
    completeButton.textContent = '✓';
    completeButton.classList.add('complete-btn');
    completeButton.addEventListener('click', function () {
        taskItem.classList.toggle('completed');
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', function () {
        const newTaskText = prompt('Edit task:', taskSpan.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            taskSpan.textContent = newTaskText.trim() + ' ';
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', function () {
        taskList.removeChild(taskItem);
    });

    taskItem.appendChild(completeButton);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    // Add task to the appropriate list
    taskList.appendChild(taskItem);
}
