import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex">
      <div className="spinner-border text-black-50 m-auto">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
