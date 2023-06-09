import { useState, useEffect } from 'react';

import './MindBlog.css'

function MindBlog() {

    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('https://mindserver-production.up.railway.app/blog');
            const data = await response.json();
            return data;
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        const getBlogs = async () => {
            const data = await fetchBlogs();
            setBlogs(data);
        };

        getBlogs();
    }, []);

    return (
        <div className="me_mindblog">
            <div className="mindblog">
                <div className="mindblog_container">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="blog_container">
                            <p className="blog_title">{blog.title}</p>
                            <p className="blog_content">{blog.body}</p>
                            <p className='blog_fuente italic'>{blog.fuente}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MindBlog