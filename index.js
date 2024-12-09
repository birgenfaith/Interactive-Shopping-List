// Select DOM elements
const itemInput = document.getElementById("itemInput");
const addButton = document.getElementById("addButton");
const clearButton = document.getElementById("clearButton");
const itemList = document.getElementById("itemList");

// Array to store items
let items = JSON.parse(localStorage.getItem("shoppingList")) || [];

// Function to render the list
function renderList() {
  shoppingList.innerHTML = ""; // Clear current list
  items.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.className = item.purchased ? "purchased" : "";
    listItem.innerHTML = `
      <span>${item.name}</span>
      <button onclick="markPurchased(${index})">✔</button>
      <button onclick="editItem(${index})">✏</button>
      <button onclick="deleteItem(${index})">❌</button>
    `;
    shoppingList.appendChild(listItem);
  });
  saveToLocalStorage();
}

// Function to add a new item
function addItem() {
  const itemName = itemInput.value.trim();
  if (itemName) {
    items.push({ name: itemName, purchased: false });
    itemInput.value = "";
    renderList();
  }
}

// Function to mark an item as purchased
function markPurchased(index) {
  items[index].purchased = !items[index].purchased;
  renderList();
}

// Function to edit an item
function editItem(index) {
  const newName = prompt("Edit item name:", items[index].name);
  if (newName !== null && newName.trim() !== "") {
    items[index].name = newName.trim();
    renderList();
  }
}

// Function to delete an item
function deleteItem(index) {
  items.splice(index, 1);
  renderList();
}

// Function to clear the list
function clearList() {
  items = [];
  renderList();
}

// Function to save the list to local storage
function saveToLocalStorage() {
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

// Event listeners
addButton.addEventListener("click", addItem);
clearButton.addEventListener("click", clearList);

// Render the list on page load
renderList();