import React, { useState } from "react";

const Todo = props => {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState([]);

  const inputChangeHandler = e => {
    setTodoName(e.target.value);
  };

  const todoListHandler = () => {
    setTodoList(todoList.concat(todoName));
  };

  return (
    <>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName}
      />
      <button type="button" onClick={todoListHandler}>
        Add
      </button>
      <ul>
        {todoList.map(todo => (
          <li>{todo}</li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
