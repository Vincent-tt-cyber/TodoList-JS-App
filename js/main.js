//  Поиск элементов на странице
const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

// Добавить новую задачу
form.addEventListener("submit", addTask);
// Удалить задачу
tasksList.addEventListener("click", deleteTask);
// Отмечаем задачу завершенной
tasksList.addEventListener("click", doneTask);

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
}

tasks.forEach((task) => renderTask(task));

checkEmptyList();

//  Функция для создания новой задачи
function addTask(e) {
  e.preventDefault();
  const taskText = taskInput.value;

  // Задача в виде объекта
  const newTask = {
    id: `task-${Date.now()}`,
    title: taskText,
    done: false,
  };

  tasks.push(newTask);

  saveToLocalStorage();

  renderTask(newTask);

  taskInput.value = "";
  taskInput.focus();

  checkEmptyList();
}

//  Функция для удаления задачи
function deleteTask(e) {
  // Если клик был НЕ по кнопке "Удалить задачу"
  if (e.target.dataset.action !== "delete") return;

  // Если клик был по кнопке "Удалить"
  const parentNode = e.target.closest(".list-group-item");

  const taskID = parentNode.id;
  // console.log(taskID);

  // Удалание через findIndex
  // const index = tasks.findIndex((task) => task.id == taskID);
  // tasks.splice(index, 1);

  tasks = tasks.filter((task) => task.id !== taskID);
  saveToLocalStorage();

  parentNode.remove();

  // Если 1 элемент, то показывает блок "Список дел пуст"
  checkEmptyList();
}

// Функция, чтобы отметить задачу выполненной
function doneTask(e) {
  // Если клик был НЕ по кнопке "Задача выполнена"
  if (e.target.dataset.action !== "done") return;

  // проверяем что клик был по кнопке "Задача выполнена"
  const parentNode = e.target.closest(".list-group-item");

  const taskID = parentNode.id;
  // console.log(taskID);

  const task = tasks.find((task) => task.id == taskID);
  task.done = !task.done;

  saveToLocalStorage();

  parentNode.querySelector(".task-title").classList.toggle("task-title--done");
}

// Отображение и скрытие блока "Список дел пуст"
function checkEmptyList() {
  if (tasks.length == 0) {
    const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
            <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3" />
            <div class="empty-list__title">Список дел пуст</div>
          </li>`;
    tasksList.insertAdjacentHTML("afterbegin", emptyListHTML);
  }

  if (tasks.length > 0) {
    const emptyListElem = document.querySelector("#emptyList");
    emptyListElem ? emptyListElem.remove() : null;
  }
}
// TODO: https://youtu.be/vBXyJWwNN-I?t=6099

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(task) {
  const cssClass = task.done ? "task-title task-title--done" : "task-title";

  const taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
  <span class="${cssClass}">${task.title}</span>
  <div class="task-item__buttons">
  <button type="button" data-action="done" class="btn-action">
  <img src="./img/tick.svg" alt="Done" width="18" height="18">
  </button>
  <button type="button" data-action="delete" class="btn-action">
  <img src="./img/cross.svg" alt="Done" width="18" height="18">
  </button>
  </div>
  </li>`;
  tasksList.insertAdjacentHTML("beforeend", taskHTML);
}
