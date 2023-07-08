import React, { useState, useEffect } from 'react';
import { useParams, useLocation,Link } from 'react-router-dom';
import BlogPostapi from '../app/api/BlogPost.api';
import moment from 'moment';
const Postlist = () => {
    const { id } = useParams();
    const location = useLocation();
    const [viewPosts, setViewPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 3;

    const [posts, setPosts] = useState([]);

    const [blogtype, setBlogtype] = useState(null);
    const [blogtypename, setBlogtypename] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const currentRoute = location.pathname;
      
        if (currentRoute === '/') {
          fetchAllPosts();
          setBlogtype(null);
          setBlogtypename(null)
        } else if (currentRoute.startsWith('/taglist/')) {
          fetchPostsByTag(id);
        } else if (currentRoute.startsWith('/categorylist/')) {
          fetchPostsByCategory(id);
          
        } else if (currentRoute.startsWith('/Authorlist/')) {
          fetchPostsbyAuthor(id);

        }
      }, [id, location.pathname]);
      
    function handleSearchInputChange(event) {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);

        const filteredData = posts.filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTotalPages(Math.ceil(filteredData.length/itemsPerPage));
        setViewPosts(filteredData.slice(0,itemsPerPage))
    }


    const fetchAllPosts = async () => {
        try {
            const response = await BlogPostapi.getAll();
            setTotalPages(Math.ceil(response.data.blogPosts.length/itemsPerPage));
            setViewPosts(response.data.blogPosts.slice(0,itemsPerPage))
            setPosts(response.data.blogPosts);
            setBlogtype("Blog");
            setBlogtypename("Home")
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const fetchPostsbyAuthor = async (id) => {
        try {
            const response = await BlogPostapi.getByAuthor(id);
            setTotalPages(Math.ceil(response.data.blogPosts.length/itemsPerPage));
            setViewPosts(response.data.blogPosts.slice(0,itemsPerPage))
            setPosts(response.data.blogPosts);
            setBlogtype("Author");
            setBlogtypename(response.data.blogPosts[0]?.author[0]?.username || null);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const fetchPostsByCategory = async (id) => {
        try {
            const response = await BlogPostapi.getByCategory(id);
            setPosts(response.data.blogPosts);
            setTotalPages(Math.ceil(response.data.blogPosts.length/itemsPerPage));
            setViewPosts(response.data.blogPosts.slice(0,itemsPerPage))
            setBlogtype("Category");
            setBlogtypename(response.data.blogPosts[0]?.category_ids[0]?.name || null);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const fetchPostsByTag = async (id) => {
        try {
            const response = await BlogPostapi.getByTag(id);
            setTotalPages(Math.ceil(response.data.blogPosts.length/itemsPerPage));
            setViewPosts(response.data.blogPosts.slice(0,itemsPerPage))
            setPosts(response.data.blogPosts);
            setBlogtype("Tag");
            setBlogtypename(response.data.blogPosts[0]?.tag_ids[0]?.name || null);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    const [paginationNumber,SetPaginationNumber]=useState([])
    const handlePageChange = (page) => {
        setCurrentPage(page);
        if(page>0){
            var activeItem =itemsPerPage*page;
            var priviouseItem = itemsPerPage*(page-1);
            setViewPosts(posts.slice(priviouseItem,activeItem))
        }
    };

    useEffect(() => {
        // Do something whenever currentPage or viewPosts changes
        generatePageLinks();
      }, [currentPage, viewPosts]); 

    function generatePageLinks() {
        const pageLinks = [];
      
        // Previous page link
    if(totalPages >1){

   
        if (currentPage > 1 ) {
          pageLinks.push(
            <li onClick={() => handlePageChange(currentPage - 1)}>
              <i class="fas fa-arrow-left"></i>
            </li>
          );
        }
      
        // Page number links
        for (let i = 1; i <= totalPages; i++) {
          if (i === currentPage) {
            // Render the active page link
            pageLinks.push(
              <li class="active">
                <a href="#">{i}</a>
              </li>
            );
          } else {
            // Render the regular page link
            pageLinks.push(
              <li onClick={() => handlePageChange(i)}>
                <a href="#">{i}</a>
              </li>
            );
          }
        }
      
        // Next page link
        if (currentPage < totalPages) {
          pageLinks.push(
            <li onClick={() => handlePageChange(currentPage + 1)}>
              <i class="fas fa-arrow-right"></i>
            </li>
          );
        }
    }
        SetPaginationNumber(pageLinks)
      }
   

    return (
        <div>
            <div class="col-lg-12">
           
            {viewPosts.length !== 0 ? (
                <>
                {blogtype !=null && blogtypename != null ?(
                    <section class="categorie-section">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="categorie-title"> 
                                        <small>
                                            <Link to={`/Login`}>Home</Link>
                                            <i class="fas fa-angle-right"></i> {blogtypename}
                                        </small>
                                        <h3>{blogtype} : <span> {blogtypename}</span></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) : null  }
                
                <div class="container">
                    <div class="row height d-flex justify-content-center align-items-center">
                        <div class="col-md-12 pb-5">
                            <div class="form">
                            <i class="fa fa-search"></i>
        
                            <input
                                type="text"
                                placeholder="Search..."
                                class="form-control form-input"
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                            />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    
                    {/* Rest of the component */}
                </div>
                {viewPosts.map((post) => (
                    <div key={post._id}>
                    
                    <div className="post-list">
                        <div className="post-list-image">
                        <a href="post-default.html">
                            <img src={post.img != null ? post.img : window.location.origin +"/assets/img/blog/16.jpg"} alt="" />
                        </a>
                        </div>
                        <div className="post-list-content">
                        <h4 className="entry-title">
                            <Link to={`/FullPostView/${post._id}`}>{post.title}</Link>
                        </h4>

                        <div className="entry-cat">
                            {post.category_ids && post.category_ids != undefined  ? (
                                post.category_ids.map(category => (
                                    <Link className="categorie" to={`/categorylist/${category._id}`}>{category.name}</Link>
                                ))
                            ) : null}
                        </div>

                        <div className="post-exerpt" dangerouslySetInnerHTML={{ __html: `${post.description.substring(0, 200)}...` }}>
                        </div>

                        <ul className="entry-meta list-inline">
                            <li className="post-author-img">
                            <a href="author.html"> <img src={window.location.origin+"/assets/img/author/1.jpg"} alt="" /></a>
                            </li>
                            <li className="post-author">
                                {post.author && post.author != undefined  ? (
                                    <Link  to={`/Authorlist/${post.author._id}`}>{post.author.username}</Link>
                                ) : null}
                            </li>
                            <li className="post-date">
                            <span className="dot"></span> {moment(post.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}
                            </li>
                        </ul>
                        </div>
                    </div>
                    </div>
                ))}</>
                ) :  (<div className="post-list"><div class="post-exerpt">Data Not found</div></div>) }

               
             </div>
            
         
            <div class="col-12">
                <div class="pagination mt-30">
                    <ul class="list-inline"> 
                    {paginationNumber}
                    </ul>
                </div>  
            </div>
        </div>
    );
};

export default Postlist;