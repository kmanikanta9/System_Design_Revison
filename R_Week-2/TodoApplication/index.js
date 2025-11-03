
 
    const addTask = document.getElementById('add-task');
    const taskInput = document.getElementById('task-input');
    const resultsDiv = document.getElementById('results');
    const clearComplete = document.getElementById('task-complete')
    let tasks = [];
    let notCompleted = false

    addTask.addEventListener('click', addTasks);

    function addTasks() {
      const newTask = taskInput.value.trim()

      if (newTask === '') {
        alert('Please enter a task!');
        return;
      }

      tasks.push({text:newTask,completed:false});
      displayTasks();
      taskInput.value = '';
      console.log(tasks)
    }

    function clearCompleted(){
        notCompleted=!notCompleted
        displayTasks()
    }

    function displayTasks() {
      resultsDiv.innerHTML = '';

      const displayArr = notCompleted
        ? tasks.filter(task => !task.completed)
        : tasks;

      if (displayArr.length === 0) {
        resultsDiv.innerHTML = '<p style="color:gray;">No tasks to display.</p>';
        return;
      }

      displayArr.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Mark Completed';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.addEventListener('click', () => {
          tasks.splice(index, 1);
          displayTasks();
        });
        completeBtn.addEventListener('click',()=>{
            tasks[index].completed = !tasks[index].completed
            displayTasks()
        })

        li.appendChild(deleteBtn);
        li.appendChild(completeBtn);
        resultsDiv.appendChild(li);
      });
    }
