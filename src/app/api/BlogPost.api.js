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

    create(data,headers) {
      return api.post(`/api/blogposts/`, data, { headers });
    }
  
    update = (id, data,headers) => {
    
      return api.put(`/api/blogposts/${id}`, data, { headers });
    };
  
    delete(id,headers) {
      return api.delete(`/api/blogposts/${id}`, { headers });
    }
  
}

export default new BlogPostapi();
  