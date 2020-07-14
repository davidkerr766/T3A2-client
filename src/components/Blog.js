import React, { useState } from 'react'
import axios from 'axios'

const Blog = () => {

    const [blogs, setBlogs] = useState([])

    axios.get("https://limitless-island-04616.herokuapp.com/api/blogs")
        .then(data => {
            setBlogs(data.data)
        })

    return (
        <div>
            <h1>Blog</h1>
            <ul>
            { blogs.map((blog, index) => (
                <li key={index}>Title: {blog.title}. Body: {blog.body}</li>
            ))}
            </ul>
        </div>
    )
}

export default Blog