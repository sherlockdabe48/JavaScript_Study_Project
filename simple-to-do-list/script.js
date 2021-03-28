//1. Select All element
const form = document.querySelector("#new-item-form")
const input = form.querySelector("#item-input")
const list = document.querySelector("#list")
//2. When submit the form add a new element and clear the item when clicked
//1. Create item
form.addEventListener("submit", (e) => {
  e.preventDefault()
  const item = document.createElement("div")
  item.classList.add("list-item")
  item.innerText = input.value
  //1.2 Add item in the list
  list.appendChild(item)
  //2. Clear input
  input.value = ""
  //3. Remove item when click
  item.addEventListener("click", () => {
    item.remove()
  })
})
