import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import { useHistory, Link } from 'react-router-dom'
import Blog from './Blog'

const ShowBlog = (props) => {
    const { blogs } = useContext(UserContext)
    const [blog, setBlog] = useState()
    const history = useHistory()

    useEffect(()=> {
        setBlog(blogs[props.match.params.index])
    }, [blogs, props.match.params.index])

    return (
        <div className="browse">
            {blog && <Blog {...blog} />}
            <button onClick={e => {e.preventDefault(); history.goBack()}}>Back</button>
            <Link to={`/blogs/${props.match.params.index}/edit`}><button>Edit</button></Link>
            <Link to="/blogs"><button>Blogs</button></Link>
        </div>
    )
}

export default ShowBlog