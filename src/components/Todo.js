import React from "react";
import crossIcon from "./../images/icon-cross.svg";
import checkIcon from "./../images/icon-check.svg";
import darkBg from "./../images/bg-desktop-dark.jpg";
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode } from "../features/todos/themeSlice";
import { completeTodo, removeTodo } from "../features/todos/todosSlice";

function Todo({ id, content, completed }) {
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const completedTodoHandler = () => {
    dispatch(completeTodo(id));
  };

  const removeTodoHandler = () => {
    dispatch(removeTodo(id));
  };
  return (
    <div
      onClick={completedTodoHandler}
      className={`todo_container ${!darkMode ? "whiteBg" : ""}`}
    >
      <div className={`circle ${completed ? "active" : ""}`}>
        <img src={checkIcon} alt="" />
      </div>
      <li
        className={`todo ${!darkMode ? "whiteBg" : ""} ${
          completed ? "active" : ""
        }`}
      >
        {content}
      </li>
      <img
        onClick={removeTodoHandler}
        src={crossIcon}
        className="delete-icon"
        alt=""
      />
    </div>
  );
}

export default Todo;
