import React, { Component } from "react";

class TodoForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    const input = document.querySelector("#newitem");
    const value = input.value;
    input.value = "";

    this.props.addTodo(value);
  };
  render() {
    return (
      <form name="newform" onSubmit={this.handleSubmit}>
        <label htmlFor="newitem">Add to the todo list</label>
        <input type="text" name="newitem" id="newitem" />
        <button type="submit">Add item</button>
      </form>
    );
  }
}

export default TodoForm;
