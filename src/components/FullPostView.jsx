import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BlogPostapi from '../app/api/BlogPost.api';
import moment from 'moment';
const FullPostView = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
        fetchPosts();
        console.log(post);
        console.log(post.category_ids)
    }, []);

    const fetchPosts = async () => {
        try {
        const response = await BlogPostapi.get(id);
        setPost(response.data.blogPost);        
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };


    return (
        <div className="post-single">
            {post ? (
            <>
                <div className="post-single-image">
                <img src={post.img ? post.img : window.location.origin +"/assets/img/blog/16.jpg"} alt="" />
                </div>
                <div className="post-single-content">
            
                    {post.category_ids && post.category_ids != undefined  ? (
                        post.category_ids.map(category => (
                        <li key={category._id}>
                            <Link className="categorie" to={`/categorylist/${category._id}`}>{category.name}</Link>
                        </li>
                        ))
                    ) : null}
                <h3 className="title">{post.title}</h3>
                <ul className="entry-meta list-inline">
                    <li className="post-author-img">
                    <a href="author.html">
                        <img src={window.location.origin +"/assets/img/author/1.jpg"} alt="" />
                    </a>
                    </li>
                    <li className="post-author">
                    <a href="author.html">{post.title}</a>
                    </li>
                    <li className="post-date">
                    <span className="dot"></span>{" "}
                    {moment(post.updatedAt).format("MMMM Do YYYY, h:mm:ss a")}
                    </li>
                </ul>
                </div>
                <div className="post-single-body" dangerouslySetInnerHTML={{ __html: post.description}}></div>
                <div className="post-single-footer">
                <div className="tags">
                    <ul className="list-inline">
                    {post.tag_ids && post.tag_ids != undefined  ? (
                        post.tag_ids.map(tag => (
                        <li key={tag._id}>
                            <Link to={`/taglist/${tag._id}`}>{tag.name}</Link>
                        </li>
                        ))
                    ) : null}
                    </ul>
                </div>
                <div className="social-media">
                    <ul className="list-inline">
                    <li>
                        <a href="#" className="color-facebook">
                        <i className="fab fa-facebook"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="color-instagram">
                        <i className="fab fa-instagram"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="color-twitter">
                        <i className="fab fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="color-youtube">
                        <i className="fab fa-youtube"></i>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="color-pinterest">
                        <i className="fab fa-pinterest"></i>
                        </a>
                    </li>
                    </ul>
                </div>
                </div>
            </>
            ) : (
            <div>Loading...</div>
            )}
        </div>
        );

};

export default FullPostView;