import BaseUrl from "../BaseUrl"; 

// 1. جلب كل التودوز
export const getAllTODoesApi = async () => {
  try {
    const response = await BaseUrl.get('/todos');
    return response.data;
  } catch (e) {
    console.error("Error fetching To-Dos:", e);
    throw e;
  }
};

// 2. جلب تودو محدد
export const getSpecificTODoesApi = async (id) => {
  try {
    const response = await BaseUrl.get(`/todos/${id}`);
    return response.data;
  } catch (e) {
    console.error("Error fetching specific To-Do:", e);
    throw e;
  }
};

// 3. إضافة تودو جديد
export const addTODoesApi = async (task) => {
  try {
    const response = await BaseUrl.post('/todos', { task });
    return response.data;
  } catch (e) {
    console.error("Error adding To-Do:", e);
    throw e;
  }
};

// 4. تحديث نص التودو (PUT على /todos/:id)
export const UpdateTODoesApi = async (id, task) => {
  try {
    const response = await BaseUrl.put(`/todos/${id}`, { task });
    return response.data;
  } catch (e) {
    console.error("Error updating To-Do:", e);
    throw e;
  }
};

// 5. تبديل حالة الـ isCompleted (PATCH على /todos/:id/toggle-complete)
export const toggleCompletedTODoesApi = async (id) => {
  try {
    const response = await BaseUrl.patch(`/todos/${id}/toggle-complete`);
    return response.data;
  } catch (e) {
    console.error("Error toggling To-Do completion:", e);
    throw e; 
  }
};

// 6. حذف تودو
export const deleteTODoesApi = async (id) => {
  try {
    const response = await BaseUrl.delete(`/todos/${id}`);
    return response.data;
  } catch (e) {
    console.error("Error deleting To-Do:", e);
    throw e; 
  }
};
