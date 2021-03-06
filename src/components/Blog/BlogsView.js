import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import Blog from "./Blog";
import { Link } from "react-router-dom";
import api from "../../api";

const BlogsView = () => {
  const { blogs, setBlogs, setConfMsg, setErrorMsg, userData } = useContext(
    AppContext
  );

  return (
    <div className="browse">
      <h1>BLOG</h1>
      {userData.user && (
        <Link to="blogs/new">
          <button>Add New Blog Post</button>
        </Link>
      )}
      {blogs && (
        <>
          {blogs.map((blog, key) => (
            <React.Fragment key={key}>
              <Blog {...blog} />
              {userData.user && (
                <>
                  <Link to={`blogs/${key}/edit`}>
                    <button>Edit</button>
                  </Link>
                  <button
                    onClick={async (e) => {
                      try {
                        e.preventDefault();
                        // send the selected blog to the delete route of the api
                        const delRes = await api.delete("blogs/delete", {
                          data: blogs[key],
                          headers: {
                            "x-auth-token": localStorage.getItem("auth-token"),
                          },
                        });
                        blogs.splice(key, 1);
                        setBlogs([...blogs]);
                        setConfMsg(delRes.data.message);
                      } catch (err) {
                        if (err.response.data.error)
                          setErrorMsg(err.response.data.error);
                      }
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
              <br />
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
};

export default BlogsView;
