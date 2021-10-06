import React from "react";
import loading from "../images/loading.svg";

const Loading = (props) => {
  return (
    <div className="loadingContainer">
      <img src={loading} alt="" />
      <h1> {props.location}.......</h1>
    </div>
  );
};

export default Loading;
