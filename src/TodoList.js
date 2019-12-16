import React, { Component } from "react";
import TodoItem from "./TodoItem";

class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.todolijstje.map((todo, index) => (
          <TodoItem
            todo={todo}
            key={index}
            index={index}
            removeTodo={this.props.removeTodo}
            toggleDone={this.props.toggleDone}
          />
        ))}
      </ul>
    );
  }
}

export default TodoList;
