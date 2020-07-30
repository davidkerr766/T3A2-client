import React from 'react'

const Blog = (props) => {
    const { blogTitle, paragraphs } = props
    return (
        <div className="content" id="blog">
            {/* All items conditionally rendered so they only appear when they exist in state on preview */}
            {blogTitle && <h2 data-testid="1">{blogTitle}</h2>}
            {(blogTitle || paragraphs.length > 0) && <div className="text">
            {(paragraphs.length > 0) && <>
                {paragraphs.map((paragraph, key) => (
                    <React.Fragment key={key}>
                        { paragraph.heading && <h3>{paragraph.heading}</h3>}
                        { paragraph.content && <p>{paragraph.content}</p>}
                    </React.Fragment>
                ))}
            </>}
            </div>}
        </div>
    )
}

export default Blog