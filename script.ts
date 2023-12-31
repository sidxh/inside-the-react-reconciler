interface Todo {
    id: number;
    text: string;
  }
  
const todos: Todo[] = [
  { id: 1, text: "First Todo" },
  { id: 2, text: "Second Todo" },
  { id: 3, text: "Third Todo" },
  { id: 4, text: "Fourth Todo" },
  { id: 5, text: "Fifth Todo" },
  { id: 6, text: "Sixth Todo" },
];

function createElement(tag: string, props: any, children: any[]): HTMLElement {
  const element = document.createElement(tag);
  Object.keys(props).forEach(key => {
    if (key === 'data-todo-id') {
      // Use setAttribute for data attributes
      element.setAttribute('data-todo-id', props[key]);
    } else {
      (element as any)[key] = props[key];
    }
  });
  children.forEach(child => {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  return element;
}
  
  function renderTodoList(): void {
  console.log('Rendering todo list...');
  const todoList = document.getElementById("todoList");
  if (todoList) {
    // Keep a reference to existing list items
    const existingListItems: { [key: string]: HTMLElement } = {};
    todoList.childNodes.forEach(node => {
      const listItem = node as HTMLElement;
      const todoId = listItem.getAttribute('data-todo-id');
      if (todoId) {
        existingListItems[todoId] = listItem;
      }
    });

    todos.forEach(todo => {
      const todoId = String(todo.id);
      const existingItem = existingListItems[todoId];

      if (existingItem) {
        // Update the existing item
        const span = existingItem.querySelector('span');
        if (span) {
          span.textContent = todo.text;
        }
      } else {
        // Create a new item if it doesn't exist
        const newListItem = createElement('li', { className: 'todoItem', 'data-todo-id': todoId, key: todoId },
          [
            createElement('span', {}, [todo.text]),
            createElement('button', { className: 'deleteButton' }, ['Delete'])
          ]
        );
        todoList.appendChild(newListItem);
      }
    });

    // Remove items that no longer exist in the state
    Object.keys(existingListItems).forEach(todoId => {
      if (!todos.some(todo => String(todo.id) === todoId)) {
        const listItem = existingListItems[todoId];
        todoList.removeChild(listItem);
      }
    });

    console.log('Rendered todo list:', todoList.outerHTML);
  }
}
  
function deleteTodo(id: number): void {
  console.log('Deleting todo with ID:', id);
  const index = todos.findIndex((todo) => todo.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    renderTodoList(); // Re-render the list after deletion
  }
}

function addTodo(): void {
  console.log('Adding a new todo...');
  const newTodoInput = document.getElementById("newTodo") as HTMLInputElement;
  const text = newTodoInput.value.trim();

  if (text) {
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
    };

    todos.push(newTodo);
    newTodoInput.value = ""; // Clear the input field
    renderTodoList(); // Re-render the list after addition
  }
}
  
document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM content loaded...');

  // Event delegation for the todo list container
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    console.log('Clicked element:', target);

    if (target.classList.contains('deleteButton')) {
      const todoId = parseInt(target.parentElement?.getAttribute('data-todo-id') || '', 10);
      console.log('Todo ID:', todoId);

      if (!isNaN(todoId)) {
        deleteTodo(todoId);
      }
    }
  });

  // Event listener for the addTodo button
  const addTodoBtn = document.getElementById("addTodoBtn");
  if (addTodoBtn) {
    addTodoBtn.addEventListener("click", () => {
      console.log('Add Todo button clicked...');
      addTodo();
    });
  }

  // Initial rendering
  renderTodoList();
});
