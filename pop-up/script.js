/*
  TODO: 2. Select the elements with the following IDs
    * modal
    * open-modal-btn
    * close-modal-btn
    * BONUS: overlay
*/

const openButton = document.querySelector("#open-modal-btn")
const modal = document.querySelector("#modal")
const closeButton = document.querySelector("#close-modal-btn")
const overlay = document.querySelector("#overlay")
console.log(overlay)

// TODO: 3. Create a click event listener for the open-modal-btn that adds the class "open" to the modal
// BONUS: Also add the class "open" to the overlay

openButton.addEventListener("click", openModal)
closeButton.addEventListener("click", closeModal)
overlay.addEventListener("click", closeModal)
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal()
  }
})

function closeModal() {
  modal.classList.remove("open")
  overlay.classList.remove("open")
}

function openModal() {
  modal.classList.add("open")
  overlay.classList.add("open")
}

// TODO: 4. Create a click event listener for the close-modal-btn that removes the class "open" from the modal
// BONUS: Also remove the class "open" from the overlay
// BONUS: Add a click event listener to the overlay that removes the class "open" from the modal and the overlay
