import React, { useContext } from "react";
import UserContext from "../context/UserContext";


const Blog = () => {
  const { blogs } = useContext(UserContext)

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
