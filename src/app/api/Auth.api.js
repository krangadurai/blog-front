import api from "./api.config";
class Authapi {
    signin(data) {
      return api.post('/api/auth/signin',data);
    }
    signup(data){
        return api.post('/api/auth/signup', data)
    }
    signout(){
        return api.post("/api/auth/signout")
    }

}  
export default new Authapi();
    