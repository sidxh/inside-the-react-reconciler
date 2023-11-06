"use strict";
var todos = [
    { id: 1, text: "First Todo" },
    { id: 2, text: "Second Todo" },
    { id: 3, text: "Third Todo" },
    { id: 4, text: "Fourth Todo" },
    { id: 5, text: "Fifth Todo" },
    { id: 6, text: "Sixth Todo" },
];
function createElement(tag, props, children) {
    var element = document.createElement(tag);
    Object.keys(props).forEach(function (key) {
        if (key === 'data-todo-id') {
            // Use setAttribute for data attributes
            element.setAttribute('data-todo-id', props[key]);
        }
        else {
            element[key] = props[key];
        }
    });
    children.forEach(function (child) {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        }
        else {
            element.appendChild(child);
        }
    });
    return element;
}
function renderTodoList() {
    console.log('Rendering todo list...');
    var todoList = document.getElementById("todoList");
    if (todoList) {
        // Keep a reference to existing list items
        var existingListItems_1 = {};
        todoList.childNodes.forEach(function (node) {
            var listItem = node;
            var todoId = listItem.getAttribute('data-todo-id');
            if (todoId) {
                existingListItems_1[todoId] = listItem;
            }
        });
        todos.forEach(function (todo) {
            var todoId = String(todo.id);
            var existingItem = existingListItems_1[todoId];
            if (existingItem) {
                // Update the existing item
                var span = existingItem.querySelector('span');
                if (span) {
                    span.textContent = todo.text;
                }
            }
            else {
                // Create a new item if it doesn't exist
                var newListItem = createElement('li', { className: 'todoItem', 'data-todo-id': todoId, key: todoId }, [
                    createElement('span', {}, [todo.text]),
                    createElement('button', { className: 'deleteButton' }, ['Delete'])
                ]);
                todoList.appendChild(newListItem);
            }
        });
        // Remove items that no longer exist in the state
        Object.keys(existingListItems_1).forEach(function (todoId) {
            if (!todos.some(function (todo) { return String(todo.id) === todoId; })) {
                var listItem = existingListItems_1[todoId];
                todoList.removeChild(listItem);
            }
        });
        console.log('Rendered todo list:', todoList.outerHTML);
    }
}
function deleteTodo(id) {
    console.log('Deleting todo with ID:', id);
    var index = todos.findIndex(function (todo) { return todo.id === id; });
    if (index !== -1) {
        todos.splice(index, 1);
        renderTodoList(); // Re-render the list after deletion
    }
}
function addTodo() {
    console.log('Adding a new todo...');
    var newTodoInput = document.getElementById("newTodo");
    var text = newTodoInput.value.trim();
    if (text) {
        var newTodo = {
            id: Date.now(),
            text: text,
        };
        todos.push(newTodo);
        newTodoInput.value = ""; // Clear the input field
        renderTodoList(); // Re-render the list after addition
    }
}
document.addEventListener("DOMContentLoaded", function () {
    console.log('DOM content loaded...');
    // Event delegation for the todo list container
    document.addEventListener('click', function (event) {
        var _a;
        var target = event.target;
        console.log('Clicked element:', target);
        if (target.classList.contains('deleteButton')) {
            var todoId = parseInt(((_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('data-todo-id')) || '', 10);
            console.log('Todo ID:', todoId);
            if (!isNaN(todoId)) {
                deleteTodo(todoId);
            }
        }
    });
    // Event listener for the addTodo button
    var addTodoBtn = document.getElementById("addTodoBtn");
    if (addTodoBtn) {
        addTodoBtn.addEventListener("click", function () {
            console.log('Add Todo button clicked...');
            addTodo();
        });
    }
    // Initial rendering
    renderTodoList();
});
