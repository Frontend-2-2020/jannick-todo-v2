import "./index.css";
import React, { Component } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import Axios from "axios";

class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    Axios.get("http://5de80f759578cb001487adea.mockapi.io/Todo").then(
      response => {
        this.setState({ todos: response.data });
      }
    );
  }

  addTodo = todo => {
    // ALLE OPTIES: https://vincent.billey.me/pure-javascript-immutable-array/

    const newTodos = [...this.state.todos];
    newTodos.push({ name: todo, done: false });

    this.setState({
      todos: newTodos
    });
  };

  removeTodoOld = index => {
    const newTodos = [...this.state.todos];
    newTodos.splice(index, 1);

    this.setState({ todos: newTodos });
  };

  removeTodo = id => {
    const index = this.state.todos.findIndex(todo => todo.id === id);

    /* FINDINDEX zonder FINDINDEX
    let index;
    for (let i = 0; i < this.state.todos.length; i++) {
      const element = this.state.todos[i];
      if(element.id === id){
        index = i;
        break;
      }
    }
    */

    const newTodos = [...this.state.todos];
    newTodos.splice(index, 1);

    this.setState({ todos: newTodos });
  };

  render() {
    return (
      <main id="todolist">
        <h1>
          Todo List<span>Get things done, one item at a time.</span>
        </h1>

        <TodoList todolijstje={this.state.todos} removeTodo={this.removeTodo} />

        <div className="togglebutton-wrapper togglebutton-checked">
          <label htmlFor="todosort">
            <span className="togglebutton-label">
              Move done items at the end?
            </span>{" "}
            <span className="tooglebutton-box"></span>
          </label>
          <input id="todosort" type="checkbox" name="todosort" />
        </div>

        <TodoForm addTodo={this.addTodo} />
      </main>
    );
  }
}

export default App;
