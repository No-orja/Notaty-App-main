import BaseUrl from "../BaseUrl"; 

export const getAllTODoesApi = async () => {
    try {
        const response = await BaseUrl.get('/todos');
        return response.data;
    } catch (e) {
        console.error("Error fetching To-Dos:", e);
        throw e;
    }
};
export const getSpecificTODoesApi = async () => {
    try {
        const response = await BaseUrl.get('/todos/:id');
        return response.data;
    } catch (e) {
        console.error("Error fetching To-Dos:", e);
        throw e;
    }
};
export const addTODoesApi = async (task) => {
    try{
        const response = await BaseUrl.post('/todos', {task});
        return response.data;
    }catch(e){
        console.error("Error fetching To-Dos:", e);
        throw e;
    }
}

export const UpdateTODoesApi = async (id, task, isCompleted) => {
    try {
        const response = await BaseUrl.put(`/todos/${id}`, { task, isCompleted });
        return response.data;
    } catch (e) {
        console.error("Error fetching To-Dos:", e);
        throw e;
    }
};

export const deleteTODoesApi = async (id) => {
    try {
        const response = await BaseUrl.delete(`/todos/${id}`);
        return response.data;
    } catch (e) {
        console.error("Error fetching To-Dos:", e);
        throw e; 
    }
};
