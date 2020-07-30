import React from "react";

const ErrorMessage = (props) => {
  return (
    <div
      className="message"
      style={{ backgroundColor: "#e6a8a8", color: "white" }}
    >
      <span>{props.message}</span>
      <button onClick={props.clearError}>X</button>
    </div>
  );
};

export default ErrorMessage;
