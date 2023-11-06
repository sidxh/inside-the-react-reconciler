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
  
  function renderTodoList(): void {
    const todoList = document.getElementById("todoList");
    if (todoList) {
      todoList.innerHTML = ""; // Clear the existing list
  
      todos.forEach((todo) => {
        const todoItem = document.createElement("li");
        todoItem.className = "todoItem";
        todoItem.innerHTML = `
          <span>${todo.text}</span>
          <button class="deleteButton" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        if (todoList) {
          todoList.appendChild(todoItem);
        }
      });
    }
  }
  
  function deleteTodo(id: number): void {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
      renderTodoList(); // Re-render the list after deletion
    }
  }
  
  function addTodo(): void {
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
  
  // Initial rendering
  renderTodoList();
  