import React, { useState } from "react";

const Todo = props => {
  const [todoState, setTodoState] = useState({ todoName: "", todoList: [] });

  const inputChangeHandler = e => {
    updateState(e.target.value);
  };

  const todoListHandler = () => {
    updateState(undefined, todoState.todoList.concat(todoState.todoName));
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
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
