import React, { useState, MenuItem } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import loginPage from "../images/loginPage.svg";
import mail from "../images/mail.svg";
import lock from "../images/lock.svg";
import Loading from "./loading";

const Login = (props) => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    status: "",
  });
  const [loading, setLoading] = useState({
    load: false,
  });
  const history = useHistory();
  // const [token, setToken] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };
  const handlesubmit = (event) => {
    event.preventDefault();
    console.log(details.email);
    console.log(details.password);
    setLoading({
      load: true,
    });
    console.log(loading.load);

    const newUserDetail = {
      email: details.email,
      password: details.password,
    };
    axios({
      headers: {
        "content-type": "application/json",
      },
      method: "post",
      url: "https://note-maker02.herokuapp.com/al/login",
      data: newUserDetail,
    })
      .then((response) => {
        localStorage.clear();
        const cook="login ho gaya";
        
        localStorage.setItem("key", JSON.stringify(cook));
        localStorage.setItem("key2", JSON.stringify(response.data.accessToken));
        
        
        console.log("kuch bhi");
        setLoading({
          load: false,
        });
        const status = response.data;
        console.log(status);
        if (status == "not allowed") {
          setError({ status: " Account not exist " });
        } else {
          history.push("/notes");
        }
      })
      .catch((error) => {
        console.log(error.response);
        setError({ status: "Account not exist make one ! " });
      });

    setDetails({ email: "", password: "" });
  };
  if (loading.load == true) {
    return (
      <div className="editor">
        <Loading location="Opening notes" />
      </div>
    );
  } else {
    return (
      <div className="editor">
        <div className="loginContainer">
          <div className="sigin_card">
            <form>
              <h1>Log In </h1>
              <br />
              <div>
                {" "}
                Email Address : <br />
                <div className="inputContainer">
                  <img src={mail} alt="" />
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    value={details.email}
                    placeholder="Enter email id "
                  ></input>
                </div>
              </div>
              <div>
                {" "}
                Password : <br />
                <div className="inputContainer">
                  <img src={lock} alt="" />
                  <input
                    type="text"
                    name="password"
                    onChange={handleChange}
                    value={details.password}
                    placeholder="Enter password  "
                  ></input>
                </div>
              </div>
              <button onClick={handlesubmit} className="loginSubmitButton">
                Submit
              </button>
              <div style={{ color: "red", fontSize: "18px" }}>
                {error.status}
              </div>
              <br />
              <br />
              <div className="hr"></div>
            </form>

            <Link
              to="/signIn"
              style={{
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Don't have a account ? Want to make One !
            </Link>
          </div>

          <div className="loginImage">
            <img src={loginPage} alt="planningImage" />
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
