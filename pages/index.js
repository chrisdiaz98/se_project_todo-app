import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import { Section } from "../utils/Section.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");

const addTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
addTodoFormValidator.enableValidation();

// --- Modal helpers ---
const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// --- Todo helpers ---
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

// --- Section setup ---
const defaultCardList = new Section({
  items: initialTodos,
  renderer: (todoData) => {
    const todoElement = generateTodo(todoData);
    defaultCardList.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});

// Render initial todos
defaultCardList.renderItems();

// --- Event Listeners ---
addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id, completed: false };

  // Add new todo to the list
  const todoElement = generateTodo(values);
  defaultCardList.addItem(todoElement);

  closeModal(addTodoPopup);
  addTodoFormValidator.resetValidation();
});
