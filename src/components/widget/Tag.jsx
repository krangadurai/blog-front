import React, { useState, useEffect} from 'react';
import TagApi from "../../app/api/Tag.api";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
const Tag = () => {
    const [tags, setTags] = useState([]);
    const fetchTags = async () => {
        const response = await TagApi.getAll();
        const data = response.data;
        console.log(data)
        return data;
      };
      useEffect(() => {
        
        fetchTags()
          .then((data) => {
            setTags(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
    return (
        <div class="widget">
            <div class="section-title">
                <h5>Tags</h5>
            </div>
            <div class="widget-tags">
                <ul class="list-inline">
                    {tags.map(tag => 
                        ( <li key={tag._id}>
                            <Link to={`/taglist/${tag._id}`}>{tag.name}</Link>
                        </li>)
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Tag;