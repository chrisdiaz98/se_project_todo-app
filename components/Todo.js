class Todo {
  constructor(data, templateSelector, handleToggleCompleted, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(templateSelector);
    this._handleToggleCompleted = handleToggleCompleted;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = this._todoCheckboxEl.checked;
      if (this._handleToggleCompleted) {
        this._handleToggleCompleted(this._data.completed);
      }
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      if (this._handleDelete) {
        this._handleDelete();
      }
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _generateDate() {
    const todoDate = this._todoElement.querySelector(".todo__date");
    if (!this._data.date) return;

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._generateDate();
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
