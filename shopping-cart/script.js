import itemsData from "./items.json"

const itemsContainer = document.querySelector("[data-items-container]")
const shoppingCartButton = document.querySelector("[data-shopping-cart-button]")
const cartContainer = document.querySelector("[data-cart-container]")
const cartItemsContainer = document.querySelector("[data-cart-items-container]")
const itemCardTemplate = document.querySelector(".item-card-template")
const cartItemTemplate = document.querySelector(".cart-item-template")
const allItemsNumber = document.querySelector("[data-all-items-number]")
const totalPrice = cartContainer.querySelector("[data-total-price]")
const SESSION_STORAGE_PREFIX = "SHOPPING_CART"
const SELECTED_ITEMS_STORAGE_KEY = `${SESSION_STORAGE_PREFIX}-selectedItems`
let newTotalPrice = 0
let selectedItems = loadSelectedItems() || []

renderShoppingCartButton()
renderShoppingCart()

itemsData.forEach((item) => {
  if (itemCardTemplate == null) return
  const itemCardClone = itemCardTemplate.content.cloneNode(true)

  const itemCard = itemCardClone.querySelector("[data-item-card]")

  const img = itemCard.querySelector("[data-item-image-color]")
  img.src = `https://dummyimage.com/420x260/${item.imageColor}/${item.imageColor}`

  const itemCategory = itemCard.querySelector("[data-item-category]")
  itemCategory.innerText = item.category

  const itemName = itemCard.querySelector("[data-item-name]")
  itemName.innerText = item.name

  const itemPrice = itemCard.querySelector("[data-item-price-cents")
  itemPrice.innerText = `$${item.priceCents / 100}.00`
  itemsContainer.appendChild(itemCard)

  const addToCartButton = itemCard.querySelector("[data-add-to-cart-button]")
  addToCartButton.addEventListener("click", () => {
    shoppingCartButton.classList.remove("invisible")

    const sameItem = selectedItems.find((i) => i.id === item.id)
    //If same item Don't clone
    if (sameItem) {
      sameItem.number += 1
    } else {
      item.number += 1
      selectedItems.push(item)
    }

    saveSelectedItems()

    renderShoppingCart()
  })
})

cartItemsContainer.addEventListener("click", (e) => {
  if (!e.target.matches("[data-remove-from-cart-button]")) return
  const parent = e.target.closest("[data-cart-item]")
  const cartItemId = parent.dataset.cartItemId
  const find = itemsData.find((item) => item.id == cartItemId)
  find.number = 0
  parent.remove()

  selectedItems = selectedItems.filter(
    (selectedItem) => selectedItem.id.toString() !== cartItemId
  )

  renderTotalPrice()
  renderShoppingCartButton()
  saveSelectedItems()

  if (selectedItems.length > 0) return
  cartContainer.classList.add("invisible")
  shoppingCartButton.classList.add("invisible")
})

shoppingCartButton.addEventListener("click", (e) => {
  cartContainer.classList.toggle("invisible")
})

function refreshShoppingCart() {
  cartItemsContainer.innerHTML = ""
}

function renderShoppingCart() {
  refreshShoppingCart()
  selectedItems.forEach((selectedItem) => {
    const cartItemClone = cartItemTemplate.content.cloneNode(true)
    const cartItem = cartItemClone.querySelector("[data-cart-item]")
    cartItem.dataset.cartItemId = selectedItem.id.toString()
    const cartItemImage = cartItem.querySelector("[data-cart-item-image]")
    cartItemImage.src = `https://dummyimage.com/210x130/${selectedItem.imageColor}/${selectedItem.imageColor}`
    const cartItemName = cartItem.querySelector("[data-cart-item-name]")
    cartItemName.innerText = selectedItem.name
    const cartItemNumber = cartItem.querySelector("[data-cart-item-number]")
    cartItemNumber.innerText = `x${selectedItem.number}`
    const cartItemPrice = cartItem.querySelector("[data-cart-item-price]")
    cartItemPrice.value = (selectedItem.number * selectedItem.priceCents) / 100
    cartItemPrice.innerText = `$${cartItemPrice.value}.00`

    cartItemsContainer.appendChild(cartItem)
  })

  renderTotalPrice()
  renderShoppingCartButton()
}

function renderTotalPrice() {
  if (!selectedItems.length > 0) return
  const mapPrice = selectedItems.map((i) => (i.priceCents * i.number) / 100)
  newTotalPrice = mapPrice.reduce((total, current) => total + current)
  totalPrice.innerText = `$${newTotalPrice}.00`
}

function renderShoppingCartButton() {
  if (!selectedItems.length > 0) return

  shoppingCartButton.classList.remove("invisible")
  if (!selectedItems.length > 0) return
  const mapItemsNumber = selectedItems.map((i) => i.number)
  const allItems = mapItemsNumber.reduce((total, current) => total + current)
  allItemsNumber.innerText = allItems
}

function saveSelectedItems() {
  sessionStorage.setItem(
    SELECTED_ITEMS_STORAGE_KEY,
    JSON.stringify(selectedItems)
  )
}

function loadSelectedItems() {
  const selectedItemString = sessionStorage.getItem(SELECTED_ITEMS_STORAGE_KEY)
  return JSON.parse(selectedItemString)
}
