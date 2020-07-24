import React from 'react'

const Blog = (props) => {
    const { blogTitle, paragraphs } = props
    return (
        <div>
            {blogTitle && <h2>{blogTitle}</h2>}
            {(paragraphs.length > 0) && <>
                {paragraphs.map((paragraph, key) => (
                    <React.Fragment key={key}>
                        { paragraph.heading && <h3>{paragraph.heading}</h3>}
                        { paragraph.content && <p>{paragraph.content}</p>}
                    </React.Fragment>
                ))}
            </>}
        </div>
    )
}

export default Blog