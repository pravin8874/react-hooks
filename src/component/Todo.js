import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = props => {
  const [todoState, setTodoState] = useState({ todoName: "", todoList: [] });

  useEffect(() => {
    axios
      .get("https://react-hooks-66a58.firebaseio.com/todos.json")
      .then(result => {
        const todos = [];
        for (const key in result.data) {
          todos.push({ id: key, name: result.data[key].name });
        }
        updateState(undefined, todos);
      })
      .catch(err => {
        console.log("[Error]", err);
      });
  }, todoState);

  const inputChangeHandler = e => {
    updateState(e.target.value);
  };

  const todoListHandler = () => {
    axios
      .post("https://react-hooks-66a58.firebaseio.com/todos.json", {
        name: todoState.todoName
      })
      .then(res => {
        updateState(
          undefined,
          todoState.todoList.concat({
            id: res.data.name,
            name: todoState.todoName
          })
        );
        console.log("Todo Added", res);
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  const updateState = (
    name = todoState.todoName,
    list = todoState.todoList
  ) => {
    setTodoState({
      todoName: name,
      todoList: list
    });
  };

  return (
    <>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoState.todoName}
      />
      <button type="button" onClick={todoListHandler}>
        Add
      </button>
      <ul>
        {todoState.todoList.map(todo => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
