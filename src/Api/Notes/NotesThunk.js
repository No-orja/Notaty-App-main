import { createAsyncThunk } from "@reduxjs/toolkit"
import * as NotesApi from './NotesApi'

export const getAllNoteThunk = createAsyncThunk(
    'Todo/getAllNotes', 
    async (_, { rejectWithValue }) => {
        try {
            const response = await NotesApi.getAllNotesApi();
            console.log("The response for all Notes:", response);
            return response;
        } catch (e) {
            console.error("Error fetching Notes:", e);
            return rejectWithValue(e.message);
        }
    }
);
export const addNoteThunk = createAsyncThunk(
    'Todo/addNote', 
    async ({title, content, createdDate}, { rejectWithValue }) => {
        try {
            const response = await NotesApi.addNotesApi(title, content, createdDate);
            console.log("The response for add Note:", response);
            return response;
        } catch (e) {
            console.error("Error fetching Note:", e);
            return rejectWithValue(e.message);
        }
    }
);

export const updateNoteThunk = createAsyncThunk(
    'Todo/updateNote', 
    async ({id, title, content, createdDate}, { rejectWithValue }) => {
        try {
            const response = await NotesApi.UpdateNoteApi(id, title, content, createdDate); 
            console.log("The response for update Note:", response);
            return response;
        } catch (e) {
            console.error("Error fetching Note:", e);
            return rejectWithValue(e.message); 
        }
    }
);

export const getSpecificNoteThunk = createAsyncThunk(
    'Todo/getSpecificNote', 
    async ({id}, { rejectWithValue }) => {
        try {
            const response = await NotesApi.getSpecificNotesApi(id); 
            console.log("The response for get Note:", response);
            return response;
        } catch (e) {
            console.error("Error fetching Note:", e);
            return rejectWithValue(e.message); 
        }
    }
);

export const deleteNoteThunk = createAsyncThunk(
    'Todo/deleteNote', 
    async (id, { rejectWithValue }) => {
        try {
            const response = await NotesApi.deleteNotesApi(id); 
            console.log("The response for delete Note:", response);
            return response;
        } catch (e) {
            console.error("Error fetching Note:", e);
            return rejectWithValue(e.message); 
        }
    }
);

export const completedNoteThunk = createAsyncThunk(
    'Todo/completedNote', 
    async (id, { rejectWithValue }) => {
        try {
            const response = await NotesApi.completedNotesApi(id); 
            console.log("The response for complete Note:", response);
            return response;
        } catch (e) {
            console.error("Error fetching Note:", e);
            return rejectWithValue(e.message); 
        }
    }
);