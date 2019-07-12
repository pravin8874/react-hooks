import React, { useState } from "react";

const Todo = props => {
  const [todoState, setTodoState] = useState("");

  const inputChangeHandler = e => {
    setTodoState(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoState}
      />
      <span>{todoState}</span>
    </>
  );
};

export default Todo;
