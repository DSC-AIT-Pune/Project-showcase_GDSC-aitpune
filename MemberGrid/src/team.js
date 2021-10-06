import React from "react";
import team_mem from './images/profile.jpg';
import "./App.css";

function team(props){
    return (
    <div className="container">
        <div className="card">
            <div className="imgBx">
                <img className="circular--square" src={team_mem} alt="DSC"/>
            </div>
            <div className="contentBx">
                <h2>{props.name}</h2>
                <div className="size">
                    <h3>{props.role}</h3>
                </div>
                <div className="color">
                    <span><a href={"https://www.github.com/"+props.gh} target="_blank" rel="noopener noreferrer">
                        <span className="smi">Github</span></a>
                    </span>
                    <span><a href={"https://www.instagram.com/"+props.ig} target="_blank" rel="noopener noreferrer">
                        <span className="smi">Instagram</span></a>
                    </span>
                    <span><a href={"https://www.facebook.com/"+props.fb} target="_blank" rel="noopener noreferrer">
                        <span className="smi">Facebook</span></a>
                    </span>
                    <span><a href={"https://www.linkedin.com/in/"+props.ln} target="_blank" rel="noopener noreferrer">
                        <span className="smi">LinkdIn</span></a>
                    </span>
                </div>
            </div>
        </div>
    </div>
    );
}

export default team;
