import React, { useState } from "react";
import api from "../api";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  api
    .get("/blogs")
    .then((res) => {
      setBlogs(res.data);
    });

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {blogs.map((blog, index) => (
          <li key={index}>
            Title: {blog.title}. Body: {blog.body}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
