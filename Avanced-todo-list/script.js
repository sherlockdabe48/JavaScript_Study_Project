//Add todo
//User will type in todo and click add todo button. This should add the input to the list above.
//Delete todo
//Complete todo
//Save todo
//Load todo

const form = document.querySelector("#new-todo-form")
const todoInput = document.querySelector("#todo-input")
const button = document.querySelector("button")
const list = document.querySelector("#list")
const listTemplate = document.querySelector("#list-item-template")
const LOCAL_STORAGE_PREFIX = "ADVANCED_TODO_LIST"
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`
let todos = loadTodos() || []
todos.forEach(renderTodo)

list.addEventListener("change", (e) => {
  if (!e.target.matches("[data-list-item-checkbox]")) return

  //Get the todo that is clicked on
  //Toggle to the complete property to be equal to the checkbox value
  const parent = e.target.closest(".list-item")
  const todoId = parent.dataset.todoId
  const todo = todos.find((t) => t.id === todoId)
  todo.complete = e.target.checked
  //Save updated todo
  saveTodos()
})
list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return

  //If click delete button .list-item disaapear
  const parent = e.target.closest(".list-item")
  const todoId = parent.dataset.todoId
  //Remove todos from the screen
  parent.remove()
  //Remove todos from the list
  todos = todos.filter((todo) => todo.id !== todoId)
  //save todos
  saveTodos()
})

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const todoText = todoInput.value
  if (todoText === "") return

  const newTodo = {
    text: todoText,
    complete: false,
    id: new Date().valueOf().toString(),
  }

  renderTodo(newTodo)
  todos.push(newTodo)
  saveTodos()
  todoInput.value = ""
})

function renderTodo(todo) {
  const templateClone = listTemplate.content.cloneNode(true)
  const listItem = templateClone.querySelector(".list-item")
  listItem.dataset.todoId = todo.id
  const listItemText = templateClone.querySelector("[data-list-item-text]")
  listItemText.innerText = todo.text
  const checkbox = templateClone.querySelector("[data-list-item-checkbox]")
  checkbox.checked = todo.complete
  list.appendChild(templateClone)
}

function loadTodos() {
  const todoString = localStorage.getItem(TODOS_STORAGE_KEY)
  return JSON.parse(todoString)
}

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}

function removeTodos() {
  localStorage.removeItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}

//  a. value in list go to the ul by using list-template
//  b. when click 'Delete' button the value will disappear
//  c. store needed data to browser storage
