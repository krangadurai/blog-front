import {React , useState, useEffect} from "react";
import { BrowserRouter as Router, Switch, Route , useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CategoryFrom from './dashboard/CategoryFrom.Dashboard';
import PostForm     from  './dashboard/PostForm.Dashboard';
import TagForm      from  './dashboard/TagForm.Dashboard';
import ListCategory from './dashboard/ListCategory.Dashboard';
import ListPost     from './dashboard/ListPost.Dashboard';
import ListTag      from './dashboard/ListTag.Dashboard';


const Dashboard = () => {
    const loginState = useSelector((state) => state.app.LoginUser);
    const history = useHistory();
    useEffect(() => {
        console.log(loginState)
          if ( Object.keys(loginState).length === 0) {
            history.push("/Login"); // Replace "/dashboard" with your desired route
          }
      }, [loginState, history]);
    return (
        <main class="dashboardMain">
            <section class="section">
                <div class="container-fluid">
                    <div class="row">
                        <Router>
                        <div class="col-sm-3">
                            <div class="widget ">
                            <ul >
                                <li class="nav-item">
                                <Link to={"/dashboard/ListTag"} class="nav-link"> List  Tag</Link>
                                </li>
                                <li class="nav-item">
                                    <Link to={"/dashboard/listCategory"} class="nav-link"> List  category</Link>
                                </li>
                                <li class="nav-item">
                                  <Link to={"/dashboard/listPost"} class="nav-link"> List  Post</Link>
                                </li>
                            </ul>
                        </div>
                        </div>
                        <div class="col-sm-9 ">
                            <div class="widget">
                                  <Switch>
                                    <Route exact path={"/dashboard/"} component={ListPost}/>
                                     <Route exact path={"/dashboard/listpost"} component={ListPost}/>
                                     <Route path={"/dashboard/listcategory"} component={ListCategory}/>
                                     <Route path={"/dashboard/ListTag"} component={ListTag}/>
                                     <Route path={"/dashboard/TagForm/:id"} component={TagForm}/>
                                     <Route path={"/dashboard/TagForm"} component={TagForm}/>
                                     <Route path={"/dashboard/PostForm/:id"} component={PostForm}/>
                                     <Route path={"/dashboard/PostForm"} component={PostForm}/>
                                     <Route path={"/dashboard/CategoryFrom/id"} component={CategoryFrom}/>
                                     <Route path={"/dashboard/CategoryFrom"} component={CategoryFrom}/>
                                  </Switch>
                            </div>
                        </div>
                        </Router>
                    </div>
                </div>
            </section>        
        </main>
    );
};

export default Dashboard;