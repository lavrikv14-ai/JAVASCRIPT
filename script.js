const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// Завдання 3: завантажуємо дані з LocalStorage або використовуємо початкові
let todos = loadFromStorage() || [
  { id: 1, text: 'Вивчити HTML', checked: true },
  { id: 2, text: 'Вивчити CSS', checked: true },
  { id: 3, text: 'Вивчити JavaScript', checked: false },
]

// --- Завдання 3: функції роботи з LocalStorage ---
function saveToStorage() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function loadFromStorage() {
  const data = localStorage.getItem('todos')
  return data ? JSON.parse(data) : null
}

// --- Завдання 1, крок 1: функція додавання нового todo ---
function newTodo() {
  const text = prompt('Введіть нове завдання:')
  if (!text || text.trim() === '') return

  const newItem = {
    id: Date.now(),
    text: text.trim(),
    checked: false,
  }
  todos.push(newItem)
  saveToStorage()
  render(todos)
  updateCounter()
}

// --- Завдання 1, крок 2: функція створення HTML рядка для одного todo ---
function renderTodo(todo) {
  const textClass = todo.checked ? 'text-success text-decoration-line-through' : ''
  const checkedAttr = todo.checked ? 'checked' : ''
  return `
    <li class="list-group-item" id="item-${todo.id}">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${checkedAttr}
        onchange="checkTodo(${todo.id})" />
      <label for="${todo.id}"><span class="${textClass}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>`
}

// --- Завдання 1, крок 3: функція рендерингу всього списку ---
function render(todosArray) {
  list.innerHTML = todosArray.map(renderTodo).join('')
}

// --- Завдання 1, крок 4: функція оновлення лічильників ---
function updateCounter() {
  itemCountSpan.textContent = todos.length
  uncheckedCountSpan.textContent = todos.filter(t => !t.checked).length
}

// --- Завдання 1, крок 5: функція видалення todo ---
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id)
  saveToStorage()
  render(todos)
  updateCounter()
}

// --- Завдання 1, крок 6: функція відмітки todo ---
function checkTodo(id) {
  const todo = todos.find(t => t.id === id)
  if (todo) {
    todo.checked = !todo.checked
    saveToStorage()
    render(todos)
    updateCounter()
  }
}

// Початковий рендер при завантаженні сторінки
render(todos)
updateCounter()