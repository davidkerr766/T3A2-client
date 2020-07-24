import React, { useContext, useState, useEffect } from 'react'
import UserContext from '../context/UserContext'
import Blog from './Blog'
import { useHistory } from 'react-router-dom'
import api from '../api'

const EditBlog = (props) => {
    const index = props.match.params.index
    const { blogs, setBlogs, setErrorMsg, setConfMsg } = useContext(UserContext)
    const blog = blogs[index]
    const [blogTitle, setBlogTitle] = useState("")
    const [paragraphs, setParagraphs] = useState([])
    const [heading, setHeading] = useState("")
    const [content, setContent] = useState("")
    const history = useHistory()

    // update values when blogs have been fetched from the api
    useEffect(()=> {
        if (blog) {
            setBlogTitle(blog.blogTitle)
            setParagraphs(blog.paragraphs)
        }
    }, [blog])

    const sendUpdatedBlog = async e => {
        try {
            e.preventDefault()
            const updatedBlog = {...blog, blogTitle, paragraphs}
            const editRes = await api.put('blogs/update', updatedBlog, { headers: { "x-auth-token": localStorage.getItem("auth-token") } })
            blogs.splice(index, 1, updatedBlog)
            setBlogs([...blogs])
            setConfMsg(editRes.data.message)
            history.push(`/blogs/${index}`)
        } catch (err) {
             if (err.response.data.error) setErrorMsg(err.response.data.error)
        }

    }

    const addParagraph = e => {
        e.preventDefault()
        if (content) {
            setParagraphs([...paragraphs, { heading, content}])
            setContent("")
            setHeading("")
        } else {
            setErrorMsg("A paragraph must have content")
        }
    }

    return (
        <div>
            <h1>Edit Blog</h1>
            <form onSubmit={sendUpdatedBlog}>
                <label htmlFor="blogTitle">Title:</label>
                <input type="text" onChange={e => setBlogTitle(e.target.value)} value={blogTitle} /> <br />
                {
                    paragraphs.map((paragraph, key) => (
                        <React.Fragment key={key}>
                            <h4>Paragraph {key +1}<button onClick={ e => {
                                e.preventDefault()
                                paragraphs.splice(key, 1)
                                setParagraphs([...paragraphs])
                            }}>X</button></h4>

                            <label htmlFor="heading">Heading:</label>
                            <input type="text" onChange={e => {
                                paragraphs.splice(key, 1, {heading: e.target.value, content: paragraph.content})
                                setParagraphs([...paragraphs])
                            }} value={paragraph.heading} /> <br />
                            <label htmlFor="content">Content:</label>
                            <textarea id="content" rows="4" cols="50" onChange={e => {
                                paragraphs.splice(key, 1, {heading: paragraph.heading, content: e.target.value})
                                setParagraphs([...paragraphs])
                            }} value={paragraph.content} /> <br />
                        </React.Fragment>
                    ))
                }
                <h4>New Paragraph</h4>
                <label htmlFor="newHeading">Heading:</label>
                <input type="text" id="newHeading" onChange={e => setHeading(e.target.value)} value={heading} /> <br />
                <label htmlFor="newContent">Content:</label> <br />
                <textarea id="newContent" rows="4" cols="50" onChange={e => setContent(e.target.value)} value={content} /> <br />
                <button onClick={addParagraph}>Add Paragraph</button>
                <br /> <br/>
                <input type="submit" value="Save Blog" />
            </form>
            <h1>Preview</h1>
            <Blog {...{blogTitle, paragraphs}}/>
        </div>
    )
}

export default EditBlog