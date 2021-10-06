import React from "react";
import wait from "../images/wait.svg";
import { Link } from "react-router-dom";

const Wait = () => {
  return (
    <div className="waitContainer">
      <img src={wait} alt="" />
      <h1>Seems like you are newbie.....</h1>
      <div className="waitButtonContainer">
        <button>
          <Link to="/login" className="waitButtonLink">
            Make a Account{" "}
          </Link>
        </button>
        <button>
          <Link to="/notes" className="waitButtonLink">
            Create Notes{" "}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Wait;
