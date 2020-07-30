import React, { useContext, useState, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useHistory, Link } from "react-router-dom";
import Blog from "./Blog";

const ShowBlog = (props) => {
  const { blogs } = useContext(AppContext);
  const [blog, setBlog] = useState();
  const history = useHistory();

  // wait until data has loaded from the api before setting state
  useEffect(() => {
    setBlog(blogs[props.match.params.index]);
  }, [blogs, props.match.params.index]);

  return (
    <div className="browse">
      {blog && <Blog {...blog} />}
      <button
        onClick={(e) => {
          e.preventDefault();
          history.goBack();
        }}
      >
        Back
      </button>
      <Link to={`/blogs/${props.match.params.index}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/blogs">
        <button>Blogs</button>
      </Link>
    </div>
  );
};

export default ShowBlog;
