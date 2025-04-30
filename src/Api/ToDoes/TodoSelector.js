// all Todos selector
export const selectToDoes = state => state.todos.todos;

// Get All Todos
export const selectGetAllTodosStatus = state => state.todos.getAllToDoesStatus;
export const selectGetAllTodosError  = state => state.todos.getAllToDoesError;

// Add Todo
export const selectAddToDoesStatus = state => state.todos.addToDoesStatus;
export const selectAddToDoesError  = state => state.todos.addToDoesError;

// Update Todo
export const selectUpdateToDoesStatus = state => state.todos.updateToDoesStatus;
export const selectUpdateToDoesError  = state => state.todos.updateToDoesError;

// Update Todo Completed
export const selectToggleCompletedToDoesStatus = state => state.todos.toggleCompletedToDoesStatus;
export const selectToggleCompletedToDoesError  = state => state.todos.toggleCompletedToDoesError;

// Delete Todo
export const selectDeleteToDoesStatus = state => state.todos.deleteToDoesStatus;
export const selectDeleteToDoesError  = state => state.todos.deleteToDoesError;
