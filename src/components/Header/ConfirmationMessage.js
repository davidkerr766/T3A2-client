import React from 'react'

const ConfirmationMessage = (props) => {
    return (
        <div className="message">
            <span>{props.message}</span>
            <button onClick={props.clearMessage}>X</button>
        </div>
    )
}

export default ConfirmationMessage