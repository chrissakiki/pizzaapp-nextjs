import React from "react";

const _error = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 80px)",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: "2rem" }}>An error occurred.</h1>
    </div>
  );
};

export default _error;
