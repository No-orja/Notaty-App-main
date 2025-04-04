//Get all note
export const selectNote = (state) => state.notes.notes;
export const selectGetAllNotesStatus = (state)=> state.notes.getAllNotesStatus
export const selectGetAllNotesError = (state)=> state.notes.getAllnotesError

// completed note selectors
export const selectCompletedNoteStatus = (state)=>state.notes.completedNoteStatus
export const selectCompletedNoteError = (state)=>state.notes.completedNoteError

// update note selectors
export const selecUpdateNoteStatus = (state)=>state.notes.updateNoteStatus
export const selectUpdateNoteError = (state)=>state.notes.updateNoteError

// delete note selectors 
export const selecDeleteNoteStatus = (state)=>state.notes.deleteNoteStatus
export const selectDeleteNoteError = (state)=>state.notes.deleteNoteError

// create Note Selectors
export const selectCreateNoteStatus = (state) => state.notes.createNoteStatus;
export const selectCreateNoteError = (state) => state.notes.createNoteError;