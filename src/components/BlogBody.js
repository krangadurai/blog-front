import React from 'react';
import { Route,Switch,BrowserRouter as Router } from 'react-router-dom/cjs/react-router-dom.min';
import FullPostView from './FullPostView';
import PostList from './PostList';
import Login from './Login';
import Signup from './Signup';
import ListHead from './ListHead';


// widget import
import Author from './widget/Author';
import Category from './widget/Category';
import LatestPost from './widget/LatestPosts';
import Tag  from  './widget/Tag'



const BlogBody = () => {
    return (
        <Router>
            <section class="blog-list" style={{ transform: 'none' }}>
                <div class="container-fluid" style={{ transform: 'none' }}>
                    <div class="row" style={{ transform: 'none' }}>
                        <div class="col-xl-9 side-content"  style={{ position: 'relative', overflow: 'visible', boxSizing: 'border-box', minHeight: '1px' }}>
                            <div class="theiaStickySidebar" style={{ paddingTop: '0px', paddingBottom: '1px', position: 'static', transform: 'none' }}>
                            <div class="row">
                                <div class="col-lg-12">
                       
                                      <Switch>
                                        <Route exact path="/" component={PostList} />
                                        <Route path="/taglist/:id" component={PostList} />
                                        <Route path="/categorylist/:id" component={PostList} /> 
                                        <Route path="/Authorlist/:id" component={PostList} /> 
                                        <Route path="/FullPostView/:id" component={FullPostView} />
                                      </Switch>
                                
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-xl-3 max-width side-sidebar" style={{ position: 'relative', overflow: 'visible', boxSizing: 'border-box', minHeight: '1px' }}>
                            <div class="theiaStickySidebar"  style={{ paddingTop: '0px', paddingBottom: '1px', position: 'static', transform: 'none' }}>
                                <Category/>
                                <Tag/>
                                <LatestPost/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </Router>
    );
};

export default BlogBody;