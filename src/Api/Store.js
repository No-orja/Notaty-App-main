import { configureStore } from "@reduxjs/toolkit";
import toDoesSlice from "./ToDoes/ToDoesSlice"; 
import notesSlice from "./Notes/NotesSlice"

export const store = configureStore({
  reducer: {
    todos: toDoesSlice, 
    notes : notesSlice,
  },
});

export default store;
