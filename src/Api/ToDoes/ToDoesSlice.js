import { 
    getAllTodoesThunk,
    addTodoThunk,
    updateToDoesThunk,
    toggleCompletedToDoesThunk, 
    deleteToDoesThunk 
} from "./ToDoesThunk";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    isLoading: false,
    error: null,
    
    getAllToDoesStatus: "idle", // idle, loading, succeeded, failed
    getAllToDoesError: null,
   
    addToDoesStatus: "idle",  
    addToDoesError: null,
    
    updateToDoesStatus: "idle", 
    updateToDoesError: null,

    toggleCompletedToDoesStatus: "idle", 
    toggleCompletedToDoesError: null,
    
    deleteToDoesStatus: "idle", 
    deleteToDoesError: null,
};

const toDoesSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get All Todos
            .addCase(getAllTodoesThunk.pending, (state) => {
                state.getAllToDoesStatus = "loading";
                state.getAllToDoesError = null;
            })
            .addCase(getAllTodoesThunk.fulfilled, (state, action) => {
                state.getAllToDoesStatus = "succeeded";
                state.todos = action.payload;
            })
            .addCase(getAllTodoesThunk.rejected, (state, action) => {
                state.getAllToDoesStatus = "failed";
                state.todos = [];
                state.getAllToDoesError = action.payload || action.error.message;
            })

            // Add Todo
            .addCase(addTodoThunk.pending, (state) => {
                state.addToDoesStatus = "loading";
                state.addToDoesError = null;
            })
            .addCase(addTodoThunk.fulfilled, (state, action) => {
                state.addToDoesStatus = "succeeded";
                state.todos.push(action.payload);
            })
            .addCase(addTodoThunk.rejected, (state, action) => {
                state.addToDoesStatus = "failed";
                state.addToDoesError = action.payload || action.error.message;
            })

            // Update Todo
            .addCase(updateToDoesThunk.pending, (state) => {
                state.updateToDoesStatus = "loading";
                state.updateToDoesError = null;
            })
            .addCase(updateToDoesThunk.fulfilled, (state, action) => {
                state.updateToDoesStatus = "succeeded";
                const updateTodo = action.payload
                state.todos = state.todos.map((todo) =>
                    todo._id === updateTodo._id ? { ...todo, ...updateTodo } : todo
                );
                  
            })
            .addCase(updateToDoesThunk.rejected, (state, action) => {
                state.updateToDoesStatus = "failed";
                state.updateToDoesError = action.payload || action.error.message;
            })

            // Toggle Completed Todo
            .addCase(toggleCompletedToDoesThunk.pending, (state) => {
                state.toggleCompletedToDoesStatus = "loading";
                state.toggleCompletedToDoesError = null;
            })
            .addCase(toggleCompletedToDoesThunk.fulfilled, (state, action) => {
                state.toggleCompletedToDoesStatus = "succeeded";
                const updatedTodo = action.payload;
                state.todos = state.todos.map((todo) =>
                    todo._id === updatedTodo._id ? { ...todo, ...updatedTodo } : todo
                );
            })
            .addCase(toggleCompletedToDoesThunk.rejected, (state, action) => {
                state.toggleCompletedToDoesStatus = "failed";
                state.toggleCompletedToDoesError = action.payload || action.error.message;
            })

            // Delete Todo
            .addCase(deleteToDoesThunk.pending, (state) => {
                state.deleteToDoesStatus = "loading";
                state.deleteToDoesError = null;
            })
            .addCase(deleteToDoesThunk.fulfilled, (state, action) => {
                state.deleteToDoesStatus = "succeeded";
                state.todos = state.todos.filter(todo => todo._id !== action.payload._id); 
            })
            .addCase(deleteToDoesThunk.rejected, (state, action) => {
                state.deleteToDoesStatus = "failed";
                state.deleteToDoesError = action.payload || action.error.message;
            })
    },
});

export default toDoesSlice.reducer;
