import React from "react";

const Notfound = () => {
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
      <h1 style={{ fontSize: "2rem" }}>404 page not found.</h1>
    </div>
  );
};

export default Notfound;
