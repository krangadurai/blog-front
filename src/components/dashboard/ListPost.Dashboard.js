import React, { useEffect, useState } from 'react';
import {_, Grid } from 'gridjs-react';
import PostApi from "../../app/api/BlogPost.api";
import BlogPostApi from '../../app/api/BlogPost.api';
import 'gridjs/dist/theme/mermaid.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {useSelector } from "react-redux";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ListPostDashboard = () => {
  const [data, setData] = useState([]);
  const history = useHistory();
  const loginState = useSelector((state) => state.app.LoginUser);
  

  useEffect(() => {
    // Fetch blogPosts data from the API
    fetchblogPosts();
    if ( Object.keys(loginState).length === 0) {
      history.push("/login"); // Replace "/dashboard" with your desired route
    }
  }, []);
  const fetchblogPosts = async () => {
    try {
      const response = await PostApi.getByAuthor(loginState.id); // Adjust this to match your actual API call
      const blogPosts = response.data.blogPosts; // Assuming the API response is an array of category objects
      console.log(response.data)
      const formattedData = blogPosts.map((blogPost) => [
           blogPost.title,
           blogPost.description.length > 100 ? `${blogPost.description.substring(0, 100)}...` : blogPost.description,
           blogPost.updatedAt,
           blogPost.createdAt,_(<div><button className={"btn border rounded-md btn-danger"} onClick={() => returnLink(blogPost._id)}>Edit</button> <button className={"btn border rounded-md btn-danger"} onClick={() => deleteBlog(blogPost._id)}>Delete</button></div>)]);
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching blogPosts:', error);
    }
  };
  useEffect(() => {
    if ( Object.keys(loginState).length === 0) {
      history.push("/login"); // Replace "/dashboard" with your desired route
    }
  },[loginState])

  const deleteBlog = async (id) => {
    const headers = {
      Authorization: `Bearer ${loginState.token}`,
    };
  
    // Show a confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this blog post?');
  
    if (confirmed) {
      try {
        await BlogPostApi.delete(id, headers);
        console.log('Blog post deleted successfully!');
        await fetchblogPosts;
        // Add code here to refresh the component or fetch updated data
        window.alert('Blog post deleted successfully!');
        
      } catch (error) {
        console.error('Error deleting blog post:', error);
      }
    }
    
  };
  
  
  
  const returnLink = (id) => {
    history.push(`/dashboard/PostForm/${id}`);
  };
  return (
    <div>
      <div className="container p-3">
      <Link  to={`/dashboard/PostForm`} class="btn btn-primary btn-sm">Add Post</Link>
      </div>
      <Grid
        data={data}
        search={true}
        columns={['Title',"Description","createdAt","updatedAt",'Actions']}
        pagination={{
          limit: 5,
        }}
      />
    </div>
  );
};

export default ListPostDashboard;
    
