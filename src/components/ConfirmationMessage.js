import React from 'react'

const ConfirmationMessage = (props) => {
    return (
        <div>
            <span>{props.message}</span>
            <button onClick={props.clearError}>X</button>
        </div>
    )
}

export default ConfirmationMessage