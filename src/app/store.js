import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';
import themeReducer from "../features/todos/themeSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    theme: themeReducer,
  },
});
