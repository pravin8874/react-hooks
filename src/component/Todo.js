import React, { useEffect, useReducer } from "react";
import axios from "axios";

const todoStateReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TODO_NAME":
      return {
        ...state,
        todoName: action.payload
      }
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
  const [state, dispatch] = useReducer(todoStateReducer, { todoName: "", todoList: [] })

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

  const inputChangeHandler = e => {
    dispatch({ type: 'UPDATE_TODO_NAME', payload: e.target.value })
    // updateState(e.target.value);
  };

  const todoListHandler = () => {
    axios
      .post("https://react-hooks-66a58.firebaseio.com/todos.json", {
        name: state.todoName
      })
      .then(res => {
        dispatch({
          type: 'ADD', payload: {
            id: res.data.name,
            name: state.todoName
          }
        })
        // updateState(
        //   undefined,
        //   todoState.todoList.concat({
        //     id: res.data.name,
        //     name: todoState.todoName
        //   })
        // );
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  // const updateState = (
  //   name = todoState.todoName,
  //   list = todoState.todoList
  // ) => {
  //   setTodoState({
  //     todoName: name,
  //     todoList: list
  //   });
  // };

  return (
    <>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={state.todoName}
      />
      <button type="button" onClick={todoListHandler}>
        Add
      </button>
      <ul>
        {state.todoList.map(todo => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
