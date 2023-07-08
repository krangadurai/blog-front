import React, { useState, useEffect} from 'react';
import CategoryApi from '../../app/api/Category.api';
import { useSelector, } from 'react-redux';
import {useParams, useHistory } from 'react-router-dom';

const CategoryFormDashboard = () => {

    const { id } = useParams();
    const loginState = useSelector((state) => state.app.LoginUser);
    const history = useHistory();
    const [errors, setErrors] = useState({});
  
    useEffect(() => {
      console.log(loginState)
        if ( Object.keys(loginState).length === 0) {
          history.push("/Login");
        }
    }, [loginState, history,id]);

    const [formData, setFormData] = useState({name:null});

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()){
            CrateCategory(formData)
         }
    };
    const validateForm = () => {
        const errors = {};
        if (!formData.name) {
        errors.name = 'Category is required';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const CrateCategory= async (data) =>{
        try {
          const headers = {
            Authorization: `Bearer ${loginState.token}`,
          };
          console.log(data)
          await CategoryApi.create( data, headers);
          console.log('Category create suceesfully');
          history.push("/dashboard/listcategory"); 
        } catch (error) {
          console.error('Error updating blog post:', error);
        }
      }
    return (
        <section class="mt-30 mb-30">
            <div class="container">
                <div class="sign widget ">
                    <div class="section-title">
                        <h5>Categorys</h5>
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
                    <form onSubmit={handleSubmit} className="sign-form widget-form " method="post">
                        <div class="form-group">
                            <input type="text" class="form-control" onChange={handleChange} placeholder="Enter the Category*"  name="name" />
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn-custom"> Submit</button>
                        </div>
                    </form>
                </div> 
            </div>
        </section>
);
};

export default CategoryFormDashboard;