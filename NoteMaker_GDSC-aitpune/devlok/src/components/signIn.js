import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import signUp from "../images/signUp_svg.svg";
import mail from "../images/mail.svg";
import lock from "../images/lock.svg";
import user from "../images/user.svg";
import { useHistory } from "react-router-dom";

const SignIn = () => {
  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdmin((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };
  const history = useHistory();
  const handlesubmit = (event) => {
    event.preventDefault();
    console.log(admin.username);
    console.log(admin.email);
    console.log(admin.password);

    const newUserDetail = {
      username: admin.username,
      email: admin.email,
      password: admin.password,
    };
    axios
      .post("https://note-maker02.herokuapp.com/al/signUp", newUserDetail)
      .then((response) => {
        history.push("/login");
      });
  };
  return (
    <div className="editor">
      <div className="loginContainer">
        <div className="sigin_card">
          <form>
            <h1>Get's started.</h1>
            <br />
            <div>
              Username :
              <div className="inputContainer">
                <img src={user} alt="" />
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={admin.username}
                  placeholder=" Enter Namae "
                ></input>
              </div>
            </div>
            <div>
              {" "}
              Email :
              <div className="inputContainer">
                <img src={mail} alt="" />
                <input
                  name="email"
                  type="text"
                  value={admin.email}
                  onChange={handleChange}
                  placeholder="Enter email id "
                ></input>
              </div>
            </div>
            <div>
              Password :
              <div className="inputContainer">
                <img src={lock} alt="" />
                <input
                  name="password"
                  type="text"
                  value={admin.password}
                  onChange={handleChange}
                  placeholder=" Enter password "
                ></input>
              </div>
            </div>
            <br />
            <button onClick={handlesubmit} className="loginSubmitButton">
              Submit
            </button>
            <br />
            <br />
            <div className="hr"></div>
          </form>

          <Link
            to="/logIn"
            style={{
              backgroundColor: "transparent",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Already have a account ?
          </Link>
        </div>
        <div className="loginImage">
          <img src={signUp} alt="planningImage" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
