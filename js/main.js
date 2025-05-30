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

if (localStorage.getItem("tasksHTML")) {
  tasksList.innerHTML = localStorage.getItem("tasksHTML");
}

//  Функция для создания новой задачи
function addTask(e) {
  e.preventDefault();
  const taskText = taskInput.value;

  const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
  <span class="task-title">${taskText}</span>
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
  taskInput.value = "";
  taskInput.focus();

  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }

  saveHTMLtoLS();
}

//  Функция для удаления задачи
function deleteTask(e) {
  // Если клик был НЕ по кнопке "Удалить задачу"
  if (e.target.dataset.action !== "delete") return;

  // Если клик был по кнопке "Удалить"
  const parentNode = e.target.closest(".list-group-item");
  parentNode.remove();

  // Если 1 элемент, то показывает блок "Список дел пуст"
  if (tasksList.children.length == 1) {
    emptyList.classList.remove("none");
  }
  saveHTMLtoLS();
}

// Функция, чтобы отметить задачу выполненной
function doneTask(e) {
  // Если клик был НЕ по кнопке "Задача выполнена"
  if (e.target.dataset.action !== "done") return;

  // проверяем что клик был по кнопке "Задача выполнена"
  const parentNode = e.target.closest(".list-group-item");
  parentNode.querySelector(".task-title").classList.toggle("task-title--done");
  saveHTMLtoLS();
}

function saveHTMLtoLS() {
  localStorage.setItem("tasksHTML", tasksList.innerHTML);
}
