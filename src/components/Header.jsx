import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Authapi from '../app/api/Auth.api';
import {  useDispatch} from "react-redux";
import { setLoginUsersData } from "../app/reducer";
import { useSelector } from "react-redux";

const Header = () => {
    const dispatch = useDispatch();
    const loginState = useSelector((state) => state.app.LoginUser);
    const history = useHistory();
     const handleLogout = () => {
        serverLogout();
        dispatch(setLoginUsersData({}));
      };

      const serverLogout = async() =>{
        try {
            var response = await Authapi.signout();
            history.push('/login');
        } catch (error) {
            console.log({"logout error":error})
        }
       
    }
    return (
        <header className="header fixed-top">
            <div className="header-main navbar-expand-xl">
                <div className="container-fluid">
                    <div className="header-main">
                      
                        <div className="site-branding">
                            <a className="dark-logo" href="index.html">
                                <img src={window.location.origin +"/assets/img/logo/logo-dark.png"} alt=""/>
                            </a>
                            <a className="light-logo" href="index.html">
                                <img src={window.location.origin +"/assets/img/logo/logo-white.png"} alt=""/>
                            </a>
                        </div>
                        
                        <div className="main-menu header-navbar">
                            <nav className="navbar">
                            
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ">
                                   
                                    <li className="nav-item">
                                    <Link to="/" className="nav-link">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/aboutus" className="nav-link">About</Link>
                                    </li>
                                    {Object.keys(loginState).length === 0?(
                                        <li className="nav-item">
                                            <Link to="/login" className="nav-link">Login</Link>
                                        </li>
                                     ):null}
                                    {Object.keys(loginState).length === 0?(
                                        <li className="nav-item">
                                            <Link to="/signup" className="nav-link">Signup</Link>
                                        </li>
                                    
                                    ):null}
                                </ul>
                            </div>
                            
                            </nav>
                        </div>

                        
                        <div className="header-action-items">
                        {Object.keys(loginState).length !== 0?(
                            <nav className="navbar">
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ">
                                        <li class="nav-item dropdown">
                                            <a class="nav-link dropdown-toggle entry-meta list-inline" href="javascript:void(0)" id="navbarDropdown4" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <ul >
                                                    <li class="post-author-img"> <img src={window.location.origin +"/assets/img/author/1.jpg"} alt=""/></li>
                                                    <li class="post-author">{loginState.username}</li>
                                                </ul> 
                                            </a>
                                            <ul class="dropdown-menu ">
                                                <li> <Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                                                <li> <span onClick={handleLogout} className="dropdown-item text-danger">Logout</span>  </li>

                                            </ul>
                                        </li>
                                    </ul>   
                                </div>
                            </nav>
                        ):null}
                            {/* <ul className="header-social list-inline">
                                <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                            </ul> */}
                                        
                            
                            {/* <div className="theme-switch-wrapper switch-icon">
                                <label className="theme-switch" for="checkbox">
                                <input type="checkbox" id="checkbox"/>
                                <span className="slider round ">
                                    <i className="lar la-sun icon-light"></i>
                                    <i className="lar la-moon icon-dark"></i>
                                </span>
                                </label>
                            </div> */}

                            
                            {/* <div className="search-icon"> <a href="#search">  <i className="fas fa-search"></i></a></div> */}

                            
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>  
                    </div>
                </div> 
            </div>
        </header>
    );
};

export default Header;