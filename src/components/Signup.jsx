import {React , useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route , useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch,useSelector } from "react-redux";
import { setLoginUsersData } from "../app/reducer";
import Authapi from '../app/api/Auth.api';
const Signup = () => {
    const loginState = useSelector((state) => state.app.LoginUser);
    const [signup,setSignup] = useState({username:null,email:null,password:null, picture: "assets/images/users/avatar-1.jpg"})
    const [errors,setErrors] = useState({});
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if ( Object.keys(loginState).length !== 0) {
          history.push("/Login"); // Replace "/dashboard" with your desired route
        }
    }, [loginState, history]);

    const handleChange = (event) => {
        setSignup({...signup,[event.target.name]: event.target.value});
    }
    
    const handleSingup= async(e)=>{
         e.preventDefault();
         if(verifyErrors()){
            try {
                const response = await Authapi.signup(signup);
                history.push("/Login");
            } catch (error) {
                console.error('Error fetching posts:', error);
                setErrors(error.response.data)
            }
         }
    }
 
    const verifyErrors = () => {
        const { username, email, password } = signup;
        const errors = {};
      
        if (!username) {
          errors.username = 'Username is required';
        }
      
        if (!email) {
          errors.email = 'Email is required';
         
        } else if (!isValidEmail(email)) {
          errors.email = 'Invalid email format';
        }
      
        if (!password) {
          errors.password = 'Password is required';
        } else if (password.length < 6) {
          errors.password = 'Password should be at least 6 characters long';
        }
        
      
        setErrors(errors);
        return Object.keys(errors).length === 0;
      };
      
      const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };


    return (
        <section class="mt-60  mb-60">
            <div class="container-fluid">
                <div class="sign widget">
                    <div class="section-title">
                        <h5>Sign up</h5>
                    </div>
                    {Object.keys(errors).length !== 0 && (
                      <div className="alert alert-warning" role="alert">
                        <ul>
                          {Object.values(errors).map((error) => (
                            <li>{error}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                                    
                    <form class="sign-form widget-form contact_form "  onSubmit={handleSingup} method="post">
                        <div class="form-group">
                        <input type="text" class="form-control" placeholder="Username*" onChange={handleChange} name="username" />
                        </div>
                        <div class="form-group">
                        
                        <input type="email" class="form-control" placeholder="Email Address*" onChange={handleChange}name="email" />
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="Password*" onChange={handleChange} name="password" />
                        </div>
                        {/* <div class="sign-controls form-group">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="rememberMe"/>
                            <label class="custom-control-label" for="rememberMe">Agree to our <a href="#" class="btn-link">terms &amp; conditions</a> </label>
                        </div>
                        </div> */}
                        <div class="form-group">
                        <button type="submit" class="btn-custom">Sign Up</button>
                        </div>
                        <p class="form-group text-center">Already have an account? <Link to="/login" class="btn-link">Login</Link> </p>
                    </form>
                </div> 
            </div>
        </section>
    );
};

export default Signup;