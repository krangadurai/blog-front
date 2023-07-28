import {React , useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route , useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch,useSelector } from "react-redux";
import { setLoginUsersData } from "../app/reducer";
import Authapi from '../app/api/Auth.api';
import api  from "../app/api/api.config";
const Login = () => {
    const loginState = useSelector((state) => state.app.LoginUser);
    const [signin,setSignin] = useState({username:null,password:null})
    const [error,setError] = useState({password:null,password:null,connect:null});
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(() => {
        if ( Object.keys(loginState).length !== 0) {
          history.push("/dashboard"); // Replace "/dashboard" with your desired route
        }
    }, [loginState, history]);

    const handleChange = (event) => {
        setSignin({...signin,[event.target.name]: event.target.value});
    }

    const handleSingin= async(e)=>{
        e.preventDefault();
        verifyErrors();
        var errorCheck = Object.entries(error).filter(([key, value]) => value !== null)
        if(errorCheck.length ==0){
           try {
               const response = await Authapi.signin(signin);
               sessionStorage.setItem('token', response.data.token);
               dispatch(setLoginUsersData(response.data));
           } catch (error) {
               console.error('Error fetching posts:', error);
               setError(error.response.data)
           }
          
        }
   }
   const verifyErrors = () => {
    const { username, email, password } = signin;
    const errors = {
      username: null,
      password: null,
      connect: null
    };
  
    if (!username) {
      errors.username = 'Username is required';
    }
  
    if (!email) {
      errors.email = 'Email is required';
    }
  
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password should be at least 6 characters long';
    }
    setError(errors);
  };

    return (
        <section class="mt-60 mb-60">
            <div class="container">
                <div class="sign widget ">
                    <div class="section-title">
                        <h5>Login</h5>
                    </div>
                    <form  class="sign-form widget-form " onSubmit={handleSingin}>
                            <div class="form-group">
                            <input type="text" class="form-control" placeholder="Username*" onChange={handleChange} name="username" />
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Password*" onChange={handleChange} name="password" />
                        </div>
                        {/* <div class="sign-controls form-group">
                            <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="rememberMe"/>
                                <label class="custom-control-label" for="rememberMe">Remember Me</label>
                            </div>
                            <a href="#" class="btn-link  ml-auto">Forgot Password?</a>
                        </div> */}
                        <div class="form-group">
                            <button type="submit" class="btn-custom">Login now</button>
                        </div>
                        
                        <p class="form-group text-center">Don't have an account? <Link to="/signup" class="btn-link">Create One</Link> </p>
                    </form>
                </div> 
            </div>
        </section>
    );
};

export default Login;