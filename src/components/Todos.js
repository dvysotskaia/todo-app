import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode, toggleTheme } from "../features/todos/themeSlice";
import {
  selectActiveTodos,
  selectCompletedTodos,
  selectTodos,
  selectShowTodos,
  selectShowCompletedTodos,
  selectShowActiveTodos,
  addTodo,
  showCompletedFunction,
  showAllFunction,
  showActiveFunction,
  clearCompleted,
} from "../features/todos/todosSlice";
import moonIcon from "./../images/icon-moon.svg";
import sunIcon from "./../images/icon-sun.svg";
import Todo from "./Todo";

function Todos() {
  const inputRef = useRef();
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const todos = useSelector(selectTodos);
  const completedTodos = useSelector(selectCompletedTodos);
  const activeTodos = useSelector(selectActiveTodos);

  const showTodos = useSelector(selectShowTodos);
  const showCompletedTodos = useSelector(selectShowCompletedTodos);
  const showActiveTodos = useSelector(selectShowActiveTodos);

  let todosToRender;
  let activeTodosNumber = 0;

  const submitTodo = (e) => {
    e.preventDefault();
    if (inputRef.current.value.trim()) {
      dispatch(
        addTodo({
          id: Math.random() * 1000,
          content: inputRef.current.value,
          completed: false,
        })
      );
    }
    inputRef.current.value = "";
  };

  const showCompletedHandler = () => {
    dispatch(showCompletedFunction());
  };

  const showAllHandler = () => {
    dispatch(showAllFunction());
  };

  const showActiveHandler = () => {
    dispatch(showActiveFunction());
  };

  const clearCompletedHandler = () => {
    dispatch(clearCompleted());
  };

  if (showActiveTodos) {
    todosToRender = activeTodos;
  } else if (showCompletedTodos) {
    todosToRender = completedTodos;
  } else  {
    todosToRender = todos;
  }

  todos?.forEach((todo) => {
    if (!todo.completed) {
      activeTodosNumber++;
    }
  });

  return (
    <div className="todos">
      <div className="todosHeader">
        <div className="todosInfo">
          <h1>TODOS</h1>
          <div className={`input_container ${!darkMode ? "whiteBg" : ""}`}>
            <div className="circle"></div>
            <form onSubmit={submitTodo}>
              <input
                type="text"
                ref={inputRef}
                placeholder="Create a new todo..."
              />
              <button type="submit" hidden></button>
            </form>
          </div>
          <div className={`todos_container ${!darkMode ? "active" : ""}`}>
            {todosToRender.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                content={todo.content}
                completed={todo.completed}
              />
            ))}
            <footer className={`footer ${!darkMode ? "whiteBg" : ""}`}>
              <p className="left"> {activeTodosNumber} items left</p>
              <div className="types">
                <p
                  onClick={showAllHandler}
                  className={`clear ${showTodos ? "active" : ""}`}
                >
                  All{" "}
                </p>
                <p
                  onClick={showActiveHandler}
                  className={`clear ${showActiveTodos ? "active" : ""}`}
                >
                  Active{" "}
                </p>
                <p
                  onClick={showCompletedHandler}
                  className={`clear ${showCompletedTodos ? "active" : ""}`}
                >
                  Completed{" "}
                </p>
              </div>
              <div>
                <p onClick={clearCompletedHandler} className="clear">
                  Clear completed{" "}
                </p>
              </div>
            </footer>
          </div>
        </div>
        <div onClick={() => dispatch(toggleTheme())}>
          {darkMode ? (
            <img src={sunIcon} alt="" />
          ) : (
            <img src={moonIcon} alt="" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Todos;
