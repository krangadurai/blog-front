import api from "./api.config";
class Userapi {
    getAll() {
      return api.get('/blogposts');
    }
  
    get(id) {
      return api.get(`/blogposts/${id}`);
    }
  
    create(data) {
      return api.post('/blogposts', data);
    }
  
    update(id, data) {
      return api.put(`/blogposts/${id}`, data);
    }
  
    delete(id) {
      return api.delete(`/blogposts/${id}`);
    }
  
  }
  
export default new Userapi();