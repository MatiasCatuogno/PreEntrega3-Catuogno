document.getElementById("formTask").addEventListener("submit", saveTask);

function saveTask(e) {
 let title = document.getElementById("title").value;
 let description = document.getElementById("description").value;

 const task = {
  title,
  description,
  createdAt: new Date().toISOString(),
 };

 let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
 tasks.push(task);

 localStorage.setItem("tasks", JSON.stringify(tasks));

 getTask();

 document.getElementById("formTask").reset();
 e.preventDefault();
}

function getTask() {
 let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
 let tasksView = document.getElementById("tasks");

 tasksView.innerHTML = "";

 for (let {title, description, createdAt} of tasks) {
  tasksView.innerHTML +=
  `<div class="card mb-3">
   <div class="card-body">
    <p><strong>${title}</strong> - ${description}</p>
    <small>Creado el: ${new Date(createdAt).toLocaleString()}</small> <!-- Mostrar la fecha de creación -->
    <a class="btn btn-danger" onclick="deleteTask('${title}')">
     Delete
    </a>
   </div>
  </div>`;
 }
}

function deleteTask(title) {
 let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

 tasks = tasks.filter(task => task.title !== title);

 localStorage.setItem("tasks", JSON.stringify(tasks));

 getTask();
}

getTask();
