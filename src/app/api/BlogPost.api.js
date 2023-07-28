import api from "./api.config";
class BlogPostapi {
    getAll() {
      return api.get('/api/blogposts');
    }
  
    get(id) {
      return api.get(`/api/blogposts/${id}`);
    }
    getByAuthor(id){
      return api.get(`/api/blogposts/author/${id}`);
    }
    getByCategory(id){
      return api.get(`/api/blogposts/category/${id}`);
    }
    getByTag(id){
      return api.get(`/api/blogposts/tag/${id}`);
    }

    create(data) {
      return api.post(`/api/blogposts/`, data);
    }
  
    update = (id, data) => {
    
      return api.put(`/api/blogposts/${id}`, data);
    };
  
    delete(id) {
      return api.delete(`/api/blogposts/${id}`);
    }
  
}

export default new BlogPostapi();
  