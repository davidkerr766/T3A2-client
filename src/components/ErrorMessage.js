import React from 'react'

const ErrorMessage = (props) => {
    return (
        <div>
            <p>{props.message}</p>
            <button onClick={props.clearError}>X</button>
        </div>
    )
}

export default ErrorMessage