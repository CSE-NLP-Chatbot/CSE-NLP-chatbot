import React from "react";

const ErrorComponent = ({ errorMessage }) => {
  return (
    <div className="error-container">
      <h2>Error:</h2>
      <p>{errorMessage}</p>
    </div>
  );
};

export default ErrorComponent;