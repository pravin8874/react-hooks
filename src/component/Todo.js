import React, { useState } from "react";

const Todo = props => {
  const inputState = useState("");

  const inputChangeHandler = e => {
    inputState[1](e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={inputState[0]}
      />
      <span>{inputState[0]}</span>
    </>
  );
};

export default Todo;
