import React from "react";
import Todos from "./components/Todos";
import "./App.css";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./features/todos/themeSlice";

function App() {
  const darkMode = useSelector(selectDarkMode);

  return (
    <div className={`app ${!darkMode ? "whiteBg" : ""}`}>
      <div className={`header ${!darkMode ? "whiteBg" : ""}`}></div>
      <Todos />
    </div>
  );
}

export default App;
