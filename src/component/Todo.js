import React, { useEffect, useReducer, useRef, useMemo } from "react";
import axios from "axios";
import List from "./List";

const todoStateReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        todoList: state.todoList.concat(action.payload)
      }
    case "SET":
      return {
        ...state,
        todoList: action.payload
      }
    case "REMOVE":
      return {
        ...state,
        todoList: state.todoList.filter(todo => todo.id !== action.payload)
      }
    default:
      return state;
  }
}

const Todo = props => {
  // const [todoState, setTodoState] = useState({ todoName: "", todoList: [] });
  const [state, dispatch] = useReducer(todoStateReducer, { todoList: [] })
  const todoInputRef = useRef();

  useEffect(() => {
    axios
      .get("https://react-hooks-66a58.firebaseio.com/todos.json")
      .then(result => {
        const todos = [];
        for (const key in result.data) {
          todos.push({ id: key, name: result.data[key].name });
        }
        dispatch({ type: 'SET', payload: todos })
        // updateState(undefined, todos);
      })
      .catch(err => {
        console.log("[Error]", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, state);

  const todoListHandler = () => {
    const todoName = todoInputRef.current.value;
    axios
      .post("https://react-hooks-66a58.firebaseio.com/todos.json", {
        name: todoName
      })
      .then(res => {
        dispatch({
          type: 'ADD', payload: {
            id: res.data.name,
            name: todoName
          }
        })
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  return (
    <>
      <input
        type="text"
        placeholder="Todo"
        ref={todoInputRef}
      />
      <button type="button" onClick={todoListHandler}>
        Add
      </button>
      {useMemo(() => <List todoList={state.todoList} />, [state.todoList])}
    </>
  );
};

export default Todo;
