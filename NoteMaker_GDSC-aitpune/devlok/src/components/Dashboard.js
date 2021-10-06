import React from "react";
import { Link } from "react-router-dom";
import DashboardSvg from "../images/dashBoardSvg.svg";

const Dashboard = () => {
  return (
    <div className="editor row">
      <div className="Dashboard_conatiner">
        
        <h1>Note Maker</h1>
        <br />
        <p>
          The Note Maker is a web application made by team “THE PROgrammer” for
          students so that they can make notes faster and can share with their
          friends for helping each other and developing learning enviroment
          among their friends .
        </p>
        <br />

        <h2>
          <strong>Features</strong>
        </h2>
        <br />
        <ul>
          <li> 1. You can share your notes with friends also</li>
          <li> 2. Can Make notes and store in a well arrnaged manner.</li>
          <li> 3. Facility of updating notes for future and text formating</li>
          <li>
            {" "}
            4. Can read notes of yours friends also which are shared to you .
          </li>
        </ul>
        <br />
        <p>
          So what are you waiting for <strong>Get Stated !</strong>
        </p>

        <div className="submit_options">
         
          <button className="singIn">
            {" "}
            <Link to="/signIn" style={{ backgroundColor: "transparent" }}>
              Sign Up
            </Link>{" "}
          </button>
          <button>
            {" "}
            <Link to="/login" style={{ backgroundColor: "transparent" }}>
              {" "}
              Log In
            </Link>{" "}
          </button>
        </div>
      </div>
      <img src={DashboardSvg} alt="" className="cartoon_dash" />
    </div>
  );
};

export default Dashboard;
