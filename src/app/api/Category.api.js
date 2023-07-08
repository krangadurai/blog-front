import api from "./api.config";
class Categoryapi {
    getAll() {
      return api.get('/api/categories');
    }
  
    get(id) {
      return api.get(`/api/categories/${id}`);
    }
  
    create(data,headers) {
      return api.post('/api/categories', data,{headers});
    }
  
    update(id, data,headers) {
      return api.put(`/api/categories/${id}`, data,{headers});
    }
  
    delete(id,headers) {
      return api.delete(`/api/categories/${id}`,{headers});
    }
  
  }
  
export default new Categoryapi();
  