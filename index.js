const todos = [
    { id: 1, text: "Basically This Is a " },
    { id: 2, text: "Build a project" },
    { id: 3, text: "Write code every day" },
    { id: 4, text: "Okay Got It" },
    { id: 5, text: "Write code " },
    { id: 6, text: "Ahahha day" },
  ];

  function renderTodoList() {
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = ""; // Clear the existing list
  
    todos.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.className = "todoItem";
      todoItem.innerHTML = `
        <span>${todo.text}</span>
        <button class="deleteButton" onclick="deleteTodo(${todo.id})">Delete</button>
      `;
      todoList.appendChild(todoItem);
    });
  }

  function deleteTodo(id) {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
      renderTodoList(); // Re-render the list after deletion
    }
  }
  
  function addTodo() {
    const newTodoInput = document.getElementById("newTodo");
    const text = newTodoInput.value.trim();
  
    if (text) {
      const newTodo = {
        id: Date.now(),
        text: text
      };
  
      todos.push(newTodo);
      newTodoInput.value = ""; // Clear the input field
      renderTodoList(); // Re-render the list after addition
    }
  }

  // Initial rendering
  renderTodoList();
