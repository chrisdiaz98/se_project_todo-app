import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import { Section } from "../utils/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector("#add-todo-form");

const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (todoData) => {
  const handleToggleCompleted = (isCompleted) => {
    todoCounter.updateCompleted(isCompleted ? 1 : -1);
  };

  const handleDelete = () => {
    todoCounter.updateTotal(false);
    if (todoData.completed) todoCounter.updateCompleted(false);
  };

  const todo = new Todo(
    todoData,
    "#todo-template",
    handleToggleCompleted,
    handleDelete
  );
  return todo.getView();
};

const todosSection = new Section({
  items: initialTodos,
  renderer: (todoData) => {
    const todoElement = generateTodo(todoData);
    todosSection.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});
todosSection.renderItems();

const addTodoPopup = new PopupWithForm("#add-todo-popup", (inputValues) => {
  const date = inputValues.date ? new Date(inputValues.date) : null;
  if (date) date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const newTodo = {
    id: uuidv4(),
    name: inputValues.name,
    date: date,
    completed: false,
  };

  const todoElement = generateTodo(newTodo);
  todosSection.addItem(todoElement);
  todoCounter.updateTotal(true);
  addTodoFormValidator.resetValidation();
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => addTodoPopup.open());
