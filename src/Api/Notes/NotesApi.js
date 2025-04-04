import BaseUrl from "../BaseUrl"; 

export const getAllNotesApi = async () => {
    try {
        const response = await BaseUrl.get('/notes');
        return response.data;
    } catch (e) {
        console.error("Error fetching Notes:", e);
        throw e;
    }
};

export const getSpecificNotesApi = async () => {
    try {
        const response = await BaseUrl.get('/notes/:id');
        return response.data;
    } catch (e) {
        console.error("Error fetching Notes:", e);
        throw e;
    }
};

export const addNotesApi = async (title, content, createdDate) => {
    try{
        const response = await BaseUrl.post('/notes', {title, content, createdDate});
        return response.data;
    }catch(e){
        console.error("Error fetching Notes:", e);
        throw e;
    }
}

export const UpdateNoteApi = async (id, title, content) => {
    try {
        const response = await BaseUrl.put(`/notes/${id}`, { title, content});
        return response.data;
    } catch (e) {
        console.error("Error fetching Notes:", e);
        throw e;
    }
};

export const deleteNotesApi = async (id) => {
    try {
        const response = await BaseUrl.delete(`/notes/${id}`);
        return response.data;
    } catch (e) {
        console.error("Error fetching Notes:", e);
        throw e; 
    }
};
export const completedNotesApi = async (id) => {
    try {
        const response = await BaseUrl.put(`/notes/${id}`);
        return response.data;
    } catch (e) {
        console.error("Error updating note:", e);
        throw e; 
    }
};

