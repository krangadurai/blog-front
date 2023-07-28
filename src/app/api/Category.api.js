import api from "./api.config";
class Categoryapi {
    getAll() {
      return api.get('/api/categories');
    }
  
    get(id) {
      return api.get(`/api/categories/${id}`);
    }
  
    create(data) {
      return api.post('/api/categories', data);
    }
  
    update(id, data) {
      return api.put(`/api/categories/${id}`, data);
    }
  
    delete(id) {
      return api.delete(`/api/categories/${id}`);
    }
  
  }
  
export default new Categoryapi();
  