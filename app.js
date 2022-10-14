let valueInput = document.querySelector(".input-box input");
const addBtn = document.querySelector(".input-box button");
const todoList = document.querySelector(".todo-list");
const span = document.querySelector(".footer span .pending");
const clearAllBtn = document.querySelector(".footer button");
console.log(clearAllBtn);
let task = getTaskFromLocal();
showTask(task);
valueInput.onkeyup = (e) => {
  if (valueInput.value.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};
addBtn.onclick = () => {
  handleShowtask();
  console.log(task);
};
// deleteBtn.onclick = () => {
//   alert("asjdkbj");
// };
valueInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    handleShowtask();
  }
});
// document.body.onclick = (e) => {
//   if (e.target.matches(".delete")) {
//     const index = parseInt(e.target.dataset.name);
//     let task = getTaskFromLocal();
//     task.splice(index, 1);
//     localStorage.setItem("task", JSON.stringify(task));
//     showTask(getTaskFromLocal());
//   } else if (e.target.matches(".edit")) {
//   }
// };
// clearAllBtn.onclick = (e) => {
//   let task = getTaskFromLocal();
//   if (task.length > 0) {
//     this.classList.add("active");
//     task = [];
//     localStorage.setItem("task", task);
//     showTask(task);
//   }
// };
function handleShowtask() {
  const valueTask = valueInput.value;
  let task = getTaskFromLocal();
  let taskID = addBtn.getAttribute("id");
  if (taskID == 0 || taskID) {
    task[taskID] = valueTask;
    addBtn.removeAttribute("id");
  } else {
    task.push(valueTask);
  }
  valueInput.value = "";

  localStorage.setItem("task", JSON.stringify(task));

  showTask(task);
}
function editTask(id) {
  let task = getTaskFromLocal();
  if (task.length > 0) {
    valueInput.value = task[id];
    addBtn.setAttribute("id", id);
  }
}
function deleteTask(id) {
  let task = getTaskFromLocal();
  if (confirm("Do you want delete this task")) {
    task.splice(id, 1);
    localStorage.setItem("task", JSON.stringify(task));

    showTask(task);
  }
  console.log(task);
}
function showTask(task = []) {
  let template = "";
  task.forEach((item, index) => {
    template += `<li>
          <span class="icon"
            >${item} 
        <i data-name="${index}" onclick="editTask(${index})"class="fa-solid fa-pen-to-square edit"></i>
        <i data-name="${index}" onclick="deleteTask(${index})" class="fas fa-trash delete"></i>     
          </span>
        </li>`;
    todoList.innerHTML = template;
  });
}
function getTaskFromLocal() {
  return localStorage.getItem("task")
    ? JSON.parse(localStorage.getItem("task"))
    : [];
}
