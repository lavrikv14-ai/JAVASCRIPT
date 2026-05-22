const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// Масив для зберігання справ
let todos = [
  { id: 1, text: 'Вивчити HTML', checked: true },
  { id: 2, text: 'Вивчити CSS', checked: true },
  { id: 3, text: 'Вивчити JavaScript', checked: false },
]

// Лічильник для унікальних id
let nextId = 4

// ── 1. newTodo ─────────────────────────────────────────────
function newTodo() {
  const text = prompt('Введіть нову справу:')
  if (!text || text.trim() === '') return   // скасування або порожній рядок

  const todo = { id: nextId++, text: text.trim(), checked: false }
  todos.push(todo)

  render(todos)
  updateCounter(todos)
}

// ── 2. renderTodo ──────────────────────────────────────────
// Повертає рядок HTML для однієї справи
function renderTodo(todo) {
  const checkedAttr  = todo.checked ? 'checked' : ''
  const textClass    = todo.checked
    ? 'text-success text-decoration-line-through'
    : ''

  return `
    <li class="list-group-item" data-id="${todo.id}">
      <input
        type="checkbox"
        class="form-check-input me-2"
        id="todo-${todo.id}"
        ${checkedAttr}
        onChange="checkTodo(${todo.id})"
      />
      <label for="todo-${todo.id}">
        <span class="${textClass}">${todo.text}</span>
      </label>
      <button
        class="btn btn-danger btn-sm float-end"
        onClick="deleteTodo(${todo.id})"
      >delete</button>
    </li>`
}

// ── 3. render ──────────────────────────────────────────────
// Перемальовує весь список
function render(todos) {
  const html = todos.map(renderTodo).join('')
  list.innerHTML = html
}

// ── 4. updateCounter ──────────────────────────────────────
function updateCounter(todos) {
  itemCountSpan.textContent = todos.length
  uncheckedCountSpan.textContent = todos.filter(t => !t.checked).length
}

// ── 5. deleteTodo ─────────────────────────────────────────
function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id)
  render(todos)
  updateCounter(todos)
}

// ── 6. checkTodo ──────────────────────────────────────────
function checkTodo(id) {
  todos = todos.map(t => t.id === id ? { ...t, checked: !t.checked } : t)
  render(todos)
  updateCounter(todos)
}

// ── Початковий рендер ──────────────────────────────────────
render(todos)
updateCounter(todos)