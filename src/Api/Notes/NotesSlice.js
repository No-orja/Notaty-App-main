import { 
    getAllNoteThunk,
    addNoteThunk,
    updateNoteThunk,
    deleteNoteThunk,
    completedNoteThunk
} from './NotesThunk';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notes: [],
    getAllNotesStatus: 'idle', // idle, loading, succeeded, failed
    getAllNotesError: null,

    updateNoteStatus: "idel",
    updateNoteError: null,

    completedNoteStatus: "idel",
    completedNoteError: null,

    deleteNoteStatus: "idel",
    deleteNoteError: null,

    createNoteStatus: "idel",
    createNoteError: null
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    
    reducers: {},
    
    extraReducers: (builder) => {
        builder
            // Get all Notes
            .addCase(getAllNoteThunk.pending, (state) => {
                state.getAllNotesStatus = 'loading';
                state.getAllNotesError = null;
            })

            .addCase(getAllNoteThunk.fulfilled, (state, action) => {
                state.getAllNotesStatus = 'succeeded';
                state.notes = action.payload; 
            })

            .addCase(getAllNoteThunk.rejected, (state, action) => {
                state.getAllNotesStatus = 'failed';
                state.notes = [];
                state.getAllNotesError = action.payload || action.error.message;
            })

            // Completed Note
            .addCase(completedNoteThunk.pending, (state) => {
                state.completedNoteStatus = 'loading';
                state.completedNoteError = null;
            })
            .addCase(completedNoteThunk.fulfilled, (state, action) => {
                state.completedNoteStatus = "succeeded";
                const updatedNote= action.payload;
                state.notes = state.notes.map((note) =>
                    note._id === updatedNote._id ? { ...note, ...updatedNote } : note
                );

            })
            .addCase(completedNoteThunk.rejected, (state, action) => {
                state.completedNoteStatus = 'failed';
                state.completedNoteError = action.payload || action.error.message;
            })

            // Add Note
            .addCase(addNoteThunk.pending, (state) => {
                state.createNoteStatus = 'loading';
                state.createNoteError = null;
            })
            .addCase(addNoteThunk.fulfilled, (state, action) => {
                state.createNoteStatus = 'succeeded';
                state.notes.push(action.payload);
            })
            .addCase(addNoteThunk.rejected, (state, action) => {
                state.createNoteStatus = 'failed';
                state.createNoteError = action.payload || action.error.message;
            })
            
            // Update Note
            .addCase(updateNoteThunk.pending, (state) => {
                state.updateNoteStatus = 'loading';
                state.updateNoteError = null;
            })
            .addCase(updateNoteThunk.fulfilled, (state, action) => {
                state.updateNoteStatus = 'succeeded';
                const updateNote = action.payload;
                state.notes = state.notes.map((note) =>
                    note._id === updateNote._id ? { ...note, ...updateNote }: note
                ); // Update the note in the list
            })
            .addCase(updateNoteThunk.rejected, (state, action) => {
                state.updateNoteStatus = 'failed';
                state.updateNoteError = action.payload || action.error.message;
            })
            // Delete Note
            .addCase(deleteNoteThunk.pending, (state) => {
                state.deleteNoteStatus = 'loading';
                state.updateNoteError = null;
            })
            .addCase(deleteNoteThunk.fulfilled, (state, action) => {
                state.deleteNoteStatus = 'succeeded';
                state.notes = state.notes.filter((note) => note._id !== action.payload._id); // Remove deleted note
            })
            .addCase(deleteNoteThunk.rejected, (state, action) => {
                state.deleteNoteStatus = 'failed';
                state.deleteNoteError = action.payload || action.error.message;
            });
    },
});

export default notesSlice.reducer;
