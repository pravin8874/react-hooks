import React from "react";

const list = props => {
  return (
    <ul>
      {props.todoList.map(todo => (
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  )
}

export default list;