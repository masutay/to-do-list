let editId;
let isEditTask = false;

let tasks = [
  { gorevAdi: "Görev 1", id: "1", durum: "completed" },
  { gorevAdi: "Görev 2", id: "2", durum: "pending" },
  { gorevAdi: "Görev 3", id: "3", durum: "completed" },
];


if (localStorage.getItem("tasks") !== null) {

  tasks = JSON.parse(localStorage.getItem("tasks"));
}
let textName = document.querySelector("#textName");
let taskList = document.querySelector("#task-list");
let btnAddNewTask = document.querySelector("#btnAddNewTask");
let filters = document.querySelectorAll(".filters span");

btnAddNewTask.addEventListener("click", addTask);

displayTask(document.querySelector("span.active").id);

// DISPLAY TASKS
function displayTask(filter) {
  taskList.innerHTML = " ";

  for (let task of tasks) {
    let completed = task.durum == "completed" ? "checked" : " ";

    if (filter == task.durum || filter == "all") {
      let liElement = `               
               <li class="task list-group-item">
                  <div class="form-check">
                       <input type="checkbox" onclick="checkedTask(this)"" class="form-check-input" ${completed}  id="${task.id}">
                       <label for="${task.id}" class="form-check-label ${completed} " >${task.gorevAdi}</label>
                   </div>    
               <div class="dropdown">
                   <button class="btn btn-link dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">  <i class="fa-solid fa-ellipsis"></i> </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><a onclick="deleteTask(${task.id})" class="dropdown-item delete" "id"="${task.id}">
                        <i class="fa-solid fa-trash-can delete"></i> Delete</a></li>
                        <li><a onclick='updateTask("${task.gorevAdi}",${task.id})' class="dropdown-item update" "id"="${task.id}"><i class="fa-solid fa-pen-to-square update"></i> Update</a></li>
                     
                    </ul>
               </div>
                                   
               </li>`;
      taskList.insertAdjacentHTML("beforeend", liElement);
    }
  }
}

// ADDING NEW TASK
function addTask(event) {
  if (!isEditTask) {
    tasks.push({
      gorevAdi: textName.value,
      id: tasks.length + 1,
      durum: "pending",
    });
  } else {
    for (let task of tasks) {
      if (task.id == editId) {
        task.gorevAdi = textName.value;
      }
      isEditTask = false;
    }
  }
  console.log(tasks);
  taskList.innerHTML = " ";
  textName.value = "";
  displayTask(document.querySelector("span.active").id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.preventDefault();
}

// DELETING TASK
function deleteTask(id) {
  let deleteId;
  for (let index in tasks) {
    if (tasks[index].id == id) {
      deleteId = index;
    }
  }
  tasks.splice(deleteId, 1);
  displayTask(document.querySelector("span.active").id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//UPDATING TASK

function updateTask(taskName, taskId) {
  editId = taskId;
  isEditTask = true;
  textName.value = taskName;
  textName.focus();
  displayTask(document.querySelector("span.active").id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// DELETING ALL

function deleteAllTasks() {
  tasks.splice(0, tasks.length);
  displayTask();
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//COMPLETE TASK

function checkedTask(selectedTask) {
  let durum;
  let checkLabel = document.querySelector(".form-check-label");
  if (selectedTask.checked) {
    checkLabel.classList.add("checked");
    durum = "completed";
  } else {
    checkLabel.classList.remove("checked");
    durum = "pending";
  }
  for (let task of tasks) {
    if (task.id == selectedTask.id) {
      task.durum = durum;
    }
  }
  console.log(tasks);
  displayTask(document.querySelector("span.active").id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//FILTERS TASKS

for (let span of filters) {
  span.addEventListener("click", function () {
    document.querySelector("span.active").classList.remove("active");
    span.classList.add("active");
    displayTask(span.id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}
