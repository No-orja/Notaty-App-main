import { createAsyncThunk } from "@reduxjs/toolkit"
import * as ToDoesApi from './ToDoesApi'

export const getAllTodoesThunk = createAsyncThunk(
    'Todo/getAllTodo', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await ToDoesApi.getAllTODoesApi();
            console.log("The response for all To-Dos:", response);
            return response;
        } catch (e) {
            console.error("Error fetching To-Dos:", e);
            return rejectWithValue(e.message);
        }
    }
);
export const addTodoThunk = createAsyncThunk(
    'Todo/addTodo', 
    async ({task, isCompleted}, { rejectWithValue }) => {
        try {
            const response = await ToDoesApi.addTODoesApi(task, isCompleted);
            console.log("The response for add To-Dos:", response);
            return response;
        } catch (e) {
            console.error("Error fetching To-Dos:", e);
            return rejectWithValue(e.message);
        }
    }
);

export const updateToDoesThunk = createAsyncThunk(
    'Todo/updateTodo', 
    async ({id, task}, { rejectWithValue }) => {
        try {
            const response = await ToDoesApi.UpdateTODoesApi(id, task); 
            console.log("The response for update To-Dos:", response);
            return response;
        } catch (e) {
            console.error("Error fetching To-Dos:", e);
            return rejectWithValue(e.message); 
        }
    }
);

export const getSpecificTodoThunk = createAsyncThunk(
    'Todo/getSpecificTodo', 
    async ({id}, { rejectWithValue }) => {
        try {
            const response = await ToDoesApi.getSpecificTODoesApi(id); 
            console.log("The response for update To-Dos:", response);
            return response;
        } catch (e) {
            console.error("Error fetching To-Dos:", e);
            return rejectWithValue(e.message); 
        }
    }
);

export const toggleCompletedToDoesThunk = createAsyncThunk(
    'Todo/toggleCompletedTodo', 
    async (id, { rejectWithValue }) => {
        try {
            const response = await ToDoesApi.toggleCompletedTODoesApi(id); 
            console.log("The response for update To-Dos:", response);
            return response;
        } catch (e) {
            console.error("Error fetching To-Dos:", e);
            return rejectWithValue(e.message); 
        }
    }   
);

export const deleteToDoesThunk = createAsyncThunk(
    'Todo/deleteTodo', 
    async (id, { rejectWithValue }) => {
        try {
            const response = await ToDoesApi.deleteTODoesApi(id); 
            console.log("Axios raw response:", response);
            console.log("Type of response:", typeof response);
            console.log("response._id:", response._id);
            
            return response;
        } catch (e) {
            console.error("Error fetching To-Dos:", e);
            return rejectWithValue(e.message); 
        }
    }
);