//all Todos selector
export const selectToDoes = (state) => state.todos.todos;
export const selectGetAllTodosStatus = (state) => state.todos.getAllToDoesStatus;
export const selectGetAllTodosError = (state) => state.todos.getAllToDoesError;

//Update Todo selector
export const selectUpdateToDoesStatus = (state) => state.todos.updateToDoesStatus;
export const selectUpdateToDoesError = (state) => state.todos.updateToDoesError;

//Delete Todo selector
export const selectDeleteToDoesStatus = (state) => state.todos.deleteToDoesStatus;  
export const selectDeleteToDoesError = (state) => state.todos.deleteToDoesError;

//Add Todo selector
export const selectAddToDoesStatus = (state) => state.todos.addToDoesStatus;
export const selectAddToDoesError = (state) => state.todos.addToDoesError;

