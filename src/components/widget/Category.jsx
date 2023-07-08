import React, { useState, useEffect} from 'react';
import CategoryApi from "../../app/api/Category.api";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const Category = () => {
    const [categorys, setCategorys] = useState([]);
    const fetchCategorys = async () => {
        const response = await CategoryApi.getAll();
        const data = response.data.categories;
        return data;
      };
      useEffect(() => {
        
        fetchCategorys()
          .then((data) => {
            setCategorys(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    return (
        <div class="widget">
        <div class="section-title">
            <h5>Categories</h5>
        </div>
        <ul class="widget-categories">
        {categorys.map((category) => (
            <li>
                    <Link className="categorie" to={`/categorylist/${category._id}`}>{category.name}</Link>
                    <span class="ml-auto">10 Posts</span>
            </li>
        ))}
            
        
        </ul>
    </div>
    );
};

export default Category;