import "./index.css";
import React, { Component } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import Axios from "axios";

class App extends Component {
  state = {
    todos: [],
    sort: true
  };

  componentDidMount() {
    this.getData();
    setInterval(this.getData, 10000);
  }

  getData = () => {
    Axios.get("http://5de80f759578cb001487adea.mockapi.io/Todo").then(
      response => {
        this.setState({ todos: response.data });
      }
    );
  };

  addTodo = todo => {
    // ALLE OPTIES: https://vincent.billey.me/pure-javascript-immutable-array/
    const newTodo = { name: todo, done: false };
    const newTodos = [...this.state.todos];
    newTodos.push(newTodo);

    this.setState({
      todos: newTodos
    });

    // AXIOS
    Axios.post("http://5de80f759578cb001487adea.mockapi.io/Todo", newTodo);
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

  toggleDone = id => {
    // Kopie nemen van de state
    const newTodos = [...this.state.todos];
    // index zoeken van "id";
    const index = newTodos.findIndex(todo => todo.id === id);
    // done aanpassen van dat element
    newTodos[index].done = !newTodos[index].done;

    // state updaten
    this.setState({ todos: newTodos });

    // AXIOS
    Axios.put("http://5de80f759578cb001487adea.mockapi.io/Todo/" + id, {
      done: newTodos[index].done
    });
  };

  // Functie schrijven
  // functie oproepen bij click op toggle
  // state updaten met omgekeerde sort
  toggleSort = () => {
    /*
    if(this.state.sort === true){
      this.setState({sort: false})
    } else {
      this.setState({ sort: true });
    }
    */

    //this.setState({ sort: this.state.sort === true ? false : true});

    this.setState({
      sort: !this.state.sort
    });
  };

  render() {
    let sortedTodos = [...this.state.todos];
    if (this.state.sort) {
      sortedTodos.sort((a, b) => {
        if (a.done && !b.done) {
          return 1;
        }

        if (!a.done && b.done) {
          return -1;
        }

        return 0;
      });
    }

    return (
      <main id="todolist">
        <h1>
          Todo List<span>Get things done, one item at a time.</span>
        </h1>

        <TodoList
          todolijstje={sortedTodos}
          removeTodo={this.removeTodo}
          toggleDone={this.toggleDone}
        />

        <div
          className={
            "togglebutton-wrapper" +
            (this.state.sort ? " togglebutton-checked" : "")
          }
        >
          <label htmlFor="todosort">
            <span className="togglebutton-label">
              Move done items at the end?
            </span>{" "}
            <span className="tooglebutton-box"></span>
          </label>
          <input
            id="todosort"
            type="checkbox"
            name="todosort"
            onClick={this.toggleSort}
          />
        </div>

        <TodoForm addTodo={this.addTodo} />
      </main>
    );
  }
}

export default App;
