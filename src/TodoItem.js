import React, { Component } from "react";

class TodoItem extends Component {
  render() {
    //const todo = this.props.todo;
    const { todo } = this.props;

    return (
      <li className={todo.done ? "done" : ""}>
        <span className="label">{todo.name}</span>
        <div className="actions">
          <button type="button" className="btn-picto">
            <i aria-hidden="true" className="material-icons">
              {todo.done ? "check_box" : "check_box_outline_blank"}
            </i>
          </button>
          <button
            type="button"
            className="btn-picto"
            onClick={() => this.props.removeTodo(todo.id)}
          >
            <i aria-hidden="true" className="material-icons">
              delete
            </i>
          </button>
        </div>
      </li>
    );
  }
}

export default TodoItem;
