import React, { useEffect } from 'react';
import BlogPostapi from '../../app/api/BlogPost.api';
import { useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';

const LatestPosts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        fetchAllPosts()
    },[])
    const fetchAllPosts = async () => {
        try {
            const response = await BlogPostapi.getAll();
            const blogPosts = response.data.blogPosts; 
            const sortedBlogPosts = blogPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const limitedBlogPosts = sortedBlogPosts.slice(0, 5);
            setPosts(limitedBlogPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return (
        <div className="widget ">
            <div className="section-title">
                <h5>Latest Posts</h5>
            </div>
            <ul className="widget-latest-posts">
            {posts.map( (post,key) => (
                 <li className="post-item">
                 <div className="image">
                     <a href="post-default.html"> <img src={post.img?post.img:window.location.origin +"/assets/img/latest/1.jpg"} alt="..."/></a>
                 </div>
                 <div className="count">{key+1}</div>
                 <div className="content">
                     <p className="entry-title">   <Link to={`/FullPostView/${post._id}`}>{post.title}</Link></p>
                     <small className="post-date"><i className="fas fa-clock"></i> {moment(post.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</small>
                 </div>
             </li>
            ))}
                  
            </ul>
        </div>
    );
};

export default LatestPosts;