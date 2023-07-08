import React, { useState, useEffect} from 'react';
import TagApi from "../../app/api/Tag.api";
import CategoryApi from "../../app/api/Category.api";
import BlogPostApi from '../../app/api/BlogPost.api';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams ,useHistory} from 'react-router-dom';
import { useDispatch,useSelector } from "react-redux";

const PostFormDashboard  = () => {
  const { id } = useParams();
  const loginState = useSelector((state) => state.app.LoginUser);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(loginState)
      if ( Object.keys(loginState).length === 0) {
        history.push("/Login"); // Replace "/dashboard" with your desired route
      }
      fetchPosts(id);
  }, [loginState, history,id]);


  const fetchPosts = async (id) => {
    try {
      const response = await BlogPostApi.get(id);
      const blogPostData = response.data.blogPost;
      const tagIds =[...blogPostData.tag_ids.map((tag) => tag._id)];
      console.log(tagIds)
      const categoryIds = [...blogPostData.category_ids.map((category) => category._id)];
      const updatedFormData = {
        ...blogPostData,
        tag_ids: tagIds,
        category_ids: categoryIds,
      };
      setFormData(updatedFormData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const [formData, setFormData] = useState({
    author_id:loginState.id,
    title: '',
    description: '',
    image: null,
    tag_ids: [],
    category_ids: [],
    published: false,
  });
 
  
  const [tagOptions, setTagOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    fetchTagOptions()
      .then((data) => {
        setTagOptions(data);
      })
      .catch((error) => {
        console.log(error);
      });
    fetchCategoryOptions()
      .then((data) => {
        setCategoryOptions(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchTagOptions = async () => {
    const response = await TagApi.getAll(); // Adjust this to match your actual API call
    const data = response.data;
    return data;
  };

  const fetchCategoryOptions = async () => {
    const response = await CategoryApi.getAll();
    const data = response.data.categories;
    return data;
  };

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === 'file') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
    } else if (type === 'checkbox') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked,
      }));
    } else if (name === 'tag_ids' || name === 'category_ids') {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: selectedOptions,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      {id?UpdatePost(formData):CratePost(formData)}
    }
  };


  const validateForm = () => {
    const errors = {};

    if (!formData.title) {
      errors.title = 'Title is required';
    }

    if (!formData.description) {
      errors.description = 'Description is required';
    }

    if (!formData.image) {
      errors.image = 'Image is required';
    }

    if (formData.tag_ids.length === 0) {
      errors.tag_ids = 'At least one tag must be selected';
    }

    if (formData.category_ids.length === 0) {
      errors.category_ids = 'category must be selected';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const UpdatePost = async (data) => {
    try {
      const formData = new FormData(); // Create a new FormData object
  
      // Append the fields from the 'data' object to the FormData
      for (const field in data) {
        formData.append(field, data[field]);
      }
  
      const headers = {
        Authorization: `Bearer ${loginState.token}`,
        'Content-Type': 'multipart/form-data',
      };
  
      await BlogPostApi.update(id, formData, headers); // Pass the updated 'formData' and 'headers' to the update function
      console.log('Blog post updated successfully!');
      history.push("/dashboard/listPost"); 
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  };
  const CratePost = async (data) =>{
    try {
      const formData = new FormData(); // Create a new FormData object
  
      // Append the fields from the 'data' object to the FormData
      for (const field in data) {
        formData.append(field, data[field]);
      }
      console.log(formData)
      const headers = {
        Authorization: `Bearer ${loginState.token}`,
        'Content-Type': 'multipart/form-data',
      };
      await BlogPostApi.create( formData, headers);
      console.log('Blog post updated successfully!');
      history.push("/dashboard/listPost"); 
    } catch (error) {
      console.error('Error updating blog post:', error);
    }
  }
  
  

  return (
    <section className="mt-30 mb-30">
      <div className="container">
        <div className=" widget">
          <div className="section-title">
          <h5>{id ? 'Edit Post' : 'Add Post'}</h5>
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
          <form className="sign-form widget-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter the title*"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
            
           
            <CKEditor
                    editor={ ClassicEditor }
                    data={formData.description}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          description: data,
                        }));
                    } }
                  
                />
             
            </div>
            <div className="form-group">
              <input
                type="file"
                className="form-control"
                name="image"
                onChange={handleChange}
              />
              {formData.img? (<div className='p-2'>
                <img src={formData.img} className="img-thumbnail" />
              </div>):null}
            </div>
            <div className="form-group">
              <label>
                Tag IDs:
                </label>
                <select
                  multiple
                  className="form-select" aria-label="multiple select example"
                  name="tag_ids"
                  value={formData.tag_ids}
                  onChange={handleChange}
                >
                  {tagOptions.map((tagOption) => (
                    <option key={tagOption.id} value={tagOption._id}>
                      {tagOption.name}
                    </option>
                  ))}
                </select>
              
            </div>
            <div className="form-group">
              <label>
                Category IDs:</label>
                <select
                  className="form-select" aria-label="Default select example"
                  name="category_ids"
                  value={formData.category_ids}
                  onChange={handleChange}
                >
                  {categoryOptions.map((categoryOption) => (
                    <option key={categoryOption.id} value={categoryOption._id}>
                      {categoryOption.name}
                    </option>
                  ))}
                </select>
            </div>
          
            <div class="form-check">
                  <input
                    type="checkbox"
                    name="published"
                    className="form-check-input"
                    checked={formData.published}
                    onChange={handleChange}
                  />
                  <label class="form-check-label" for="flexCheckDisabled">
                  Published:
                  </label>
            </div>
              
            <div className="form-group pt-5">
              <button type="submit" className="btn-custom">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PostFormDashboard;
