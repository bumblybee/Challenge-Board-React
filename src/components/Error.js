import React from "react";

const Error = ({ children }) => {
  return (
    <div
      style={{
        color: "#f77",
        textAlign: "center",
        fontSize: "1.1rem",
        background: "#000",
        padding: "1rem",
        margin: "0 auto",
        width: "70%",
        borderRadius: "6px",
      }}
    >
      {children}
    </div>
  );
};

export default Error;
