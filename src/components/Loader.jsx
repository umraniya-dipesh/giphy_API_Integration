import React from "react";

const Loader = () => {
  return (
    <>
      <div className="wrapper d-flex justify-content-center">
        <div className="spinner-border text-success"></div>
        <h3 className="ms-2 text-success">Loading...</h3>
      </div>
    </>
  );
};

export default Loader;
