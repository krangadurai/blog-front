import api from "./api.config";
class Tagapi {
    getAll() {
      return api.get('/api/tags');
    }
  
    get(id) {
      return api.get(`/api/tags/${id}`);
    }
  
    create(data,headers) {
      return api.post('/api/tags', data,{ headers });
    }
  
    update(id, data) {
      return api.put(`/api/tags/${id}`, data);
    }
  
    delete(id) {
      return api.delete(`/api/tags/${id}`);
    }
} 
export default new Tagapi();
  