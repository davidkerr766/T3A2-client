import React, { useState, useContext } from "react";
import AppContext from "../context/AppContext";
import { useHistory } from "react-router-dom";
import Blog from "./Blog";
import api from "../api";

const NewBlog = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const { blogs, setBlogs, setErrorMsg, setConfMsg } = useContext(AppContext);
  const history = useHistory();

  const sendBlog = async (e) => {
    try {
      e.preventDefault();
      const newBlog = { blogTitle, paragraphs };
      // data from state sent to api top create new blog
      const createRes = await api.post("/blogs/create", newBlog, {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      });
      setConfMsg(createRes.data.message);
      setBlogs([...blogs, createRes.data.data]);

      history.push(`/blogs/${blogs.length}`);
    } catch (err) {
      if (err.response.data.error) setErrorMsg(err.response.data.error);
    }
  };

  const addParagraph = (e) => {
    e.preventDefault();
    if (content) {
      // update the paragraphs array when a new paragraph is added
      setParagraphs([...paragraphs, { heading, content }]);
      setHeading("");
      setContent("");
    } else {
      setErrorMsg("A paragraph must have content");
    }
  };

  return (
    <div className="panel-container">
      <div className="panel">
        <h1>New Blog</h1>
        <form onSubmit={sendBlog}>
          <label htmlFor="blogTitle">Title:</label> <br />
          <input
            type="text"
            onChange={(e) => setBlogTitle(e.target.value)}
            value={blogTitle}
          />{" "}
          <br />
          <label htmlFor="heading">Heading:</label>
          <input
            type="text"
            onChange={(e) => setHeading(e.target.value)}
            value={heading}
          />{" "}
          <br />
          <label htmlFor="content">Paragraph Content:</label> <br />
          <textarea
            id="content"
            rows="4"
            cols="50"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />{" "}
          <br />
          <button onClick={addParagraph}>Add Paragraph</button> <br />
          <input type="submit" value="Add Blog" />
        </form>
      </div>
      <div className="panel">
        <h1>Preview</h1>
        <Blog {...{ blogTitle, paragraphs }} />
      </div>
    </div>
  );
};

export default NewBlog;
