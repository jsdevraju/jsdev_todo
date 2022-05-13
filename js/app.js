// store all variable
const todoInput = document.querySelector(".todoInput");
const filtersBtn = document.querySelectorAll(".filters span");
const clearBtn = document.querySelector(".clearBtn");
const taskBox = document.querySelector(".taskBox");

// which one checking define variable here
let editId = "";
let isEditTask = false;

// get all todos from local Storage
let todos = JSON.parse(localStorage.getItem("todo-list"));

// Show Our Todo List
const showTodo = () => {
  let liTag = "";
  if (todos) {
    todos.forEach((todo, id) => {
      // html template
      liTag += `<li class="task">
                    <input type="checkbox" id="${id}" class='checkBoxInput'>
                    <p class='todoName'>${todo.name}</p>
                            <div class="settings">
                                <ul class="taskMenu">
                                    <li onclick='editTask(${id}, "${todo.name}")' class='edit'><i class="fa-solid fa-pen-to-square"></i>Edit</li>
                                    <li onclick='deleteTask(${id})' class='delete'><i class="fa-solid fa-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </li>`;
    });
  }
  taskBox.innerHTML = liTag || `<span>You don't have any task here</span>`;
};

showTodo();

// Edit Task FUnction
const editTask = (taskId, textName) => {
  editId = taskId;
  isEditTask = true;
  todoInput.value = textName;
  todoInput.focus();
};

// Delete Task Function
const deleteTask = (deleteId) => {
  isEditTask = false;
  todos.splice(deleteId, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
};

// Delete ALl Function
clearBtn.addEventListener("click", () => {
  isEditTask = false;
  todos.splice(0, todos.length);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});

// fire a event when user typing anything
todoInput.addEventListener("keyup", (e) => {
  let todo = todoInput.value.trim();
  // If user click enter button on keyboard something going on here
  if (e.key === "Enter") {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      let addTodo = { name: todo, status: "pending" };
      todos.push(addTodo);
    } else {
      isEditTask = false;
      todos[editId].name = todo;
    }
    // When User Submit Form Value is Empty
    todoInput.value = "";
    // Set All Todo In Local Storage
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
  }
});
