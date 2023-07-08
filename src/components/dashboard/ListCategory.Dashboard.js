import React, { useEffect, useState } from 'react';
import { Grid } from 'gridjs-react';
import CategoryApi from "../../app/api/Category.api";
import 'gridjs/dist/theme/mermaid.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const ListCategoryDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch category data from the API
    const fetchCategories = async () => {
      try {
        const response = await CategoryApi.getAll(); // Adjust this to match your actual API call
        const categories = response.data.categories; // Assuming the API response is an array of category objects
        console.log(response.data)
        const formattedData = categories.map((category) => [category.name,]);
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <div className="container p-3">
        <Link  to={`/dashboard/CategoryFrom`} class="btn btn-primary btn-sm">Add Category</Link>
      </div>
      <Grid
        data={data}
        search={true}
        columns={['Name']}
        pagination={{
          limit: 5,
        }}
      />
    </div>
  );
};

export default ListCategoryDashboard;
    
