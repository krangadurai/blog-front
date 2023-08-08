import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import {  BrowserRouter as Router,Switch , Route, } from "react-router-dom";

import Login from './components/Login';
import Signup from './components/Signup';
import BlogBody from './components/BlogBody';
import Dashboard from './components/Dashboard';
import AboutUs from './components/AboutUs';
import DynamicForm from './field/DynamicForm';
function App() {
  return (
    <Router>
      <div  id="wrapper" classNameName="wrapper" >
          <div classNameName="loading">
              <div classNameName="circle"></div>
          </div>
          <Header />
          <main  class="main" style={{ transform: 'none' }}>
          <Switch>
            <Route exact path='/' component={DynamicForm}/>
            <Route exact path="/" component={BlogBody} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/Aboutus" component={AboutUs} />
          </Switch>
          </main>
          <Footer />
         
      </div>
    </Router>
  );
}

export default App;
