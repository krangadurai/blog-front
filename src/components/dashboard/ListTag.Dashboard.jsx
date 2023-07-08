import React, { useEffect, useState } from 'react';
import { Grid } from 'gridjs-react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import TagApi from "../../app/api/Tag.api";
import 'gridjs/dist/theme/mermaid.css';

const ListTagDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch Tag data from the API
    const fetchTag = async () => {
      try {
        const response = await TagApi.getAll(); // Adjust this to match your actual API call
        const Tag = response.data; // Assuming the API response is an array of Tag objects
        console.log(response.data)
        const formattedData = Tag.map((Tag) => [Tag.name,]);
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching Tag:', error);
      }
    };

    fetchTag();
  }, []);

  return (
    <div>
      <div className="container p-3">
        <Link  to={`/dashboard/TagForm`} class="btn btn-primary btn-sm">Add Tag</Link>
      </div>
      <Grid
      search={true}
        data={data}
        columns={['Name']}
        pagination={{
          limit: 5,
        }}
      />
    </div>
  );
};

export default ListTagDashboard;
    
