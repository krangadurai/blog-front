import React, { useState, useEffect} from 'react';
import TagApi from '../../app/api/Tag.api';
import { useSelector, } from 'react-redux';
import {useParams, useHistory } from 'react-router-dom';

const TagFormDashboard = () => {

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
            CrateTag(formData)
         }
    };
    const validateForm = () => {
        const errors = {};
        if (!formData.name) {
        errors.name = 'Tag is required';
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const CrateTag= async (data) =>{
        try {
          
          console.log(data)
          await TagApi.create( data);
          console.log('Tag create suceesfully');
          history.push("/dashboard/listtag"); 
        } catch (error) {
          console.error('Error updating blog post:', error);
        }
      }
    return (
        <section class="mt-30 mb-30">
            <div class="container">
                <div class="sign widget ">
                    <div class="section-title">
                        <h5>Tags</h5>
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
                            <input type="text" class="form-control" onChange={handleChange} placeholder="Enter the Tag*"  name="name" />
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

export default TagFormDashboard;