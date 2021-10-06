import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import edit from "../images/edit_button_svg.svg";
import share_svg from "../images/share.svg";
import deleteSvg from "../images/delete.svg";
import shareb from "../images/share-b.svg";
import axios from "axios";
import Loading from "./loading";
import { Link } from "react-router-dom";
import Wait from "./wait";
import jwt_decode from "jwt-decode";

const Lobby = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState({
    load: true,
  });

  const [share, setShare] = useState({ user1: "", _id: "" });

  const OnShare_button_handle = (event) => {
    event.preventDefault();
  };

  // const share_change = (event) => {

  // };

  const handleEdit = (event) => {};
  const jwt = JSON.parse(localStorage.getItem("key"));
  // console.log(jwt);

  useEffect(() => {
    fetch("https://note-maker02.herokuapp.com/note/allSaved")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => {
        setNotes(jsonRes);
        setLoading({ load: false });
      });
  }, []);
  if (jwt != "login ho gaya") {
    return (
      <div className="editor">
        <Wait />
      </div>
    );
  } else {
    if (loading.load == true) {
      return (
        <div className="editor">
          <br />

          <div className="Lobby_container">
            <Loading location="Finding notes" />
          </div>
        </div>
      );
    } else {
      return (
        <div className="editor add2">
          <div className="lobbyHeading">
            <h1>Lobby </h1>
            <div className="lobbyHeading add">
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

          <br />
          <div className="Lobby_container">
            {notes.map((note) => {
              if (notes.length == 0) {
                return <h1>There is nothing in lobby make some Notes </h1>;
              } else {
                return (
                  <div className="Note_output_box">
                    <h3>{note.topic}</h3>
                    <i>
                      {note.subject}{" "}
                      <button
                        className="more_button"
                        onClick={() => {
                          const idd = note._id + "1";
                          console.log(idd);
                          document.getElementById(idd).style.display = "flex";
                        }}
                      >
                        .....more
                      </button>
                    </i>
                    <div className="content" id={note._id + "1"}>
                      {" "}
                      {parse(note.written)}{" "}
                    </div>
                    <p className="author_name_lobby">
                      <stong>By : {note.author}</stong>
                    </p>

                    <div className="edit_button">
                      {/* <button>
                          <img src={edit} alt="edit_button" onClick={handleEdit} />
                        </button> */}
                      <button
                        onClick={() => {
                          const _id = note._id.toString();

                          console.log(_id);
                          axios({
                            headers: {
                              "content-type": "application/json",
                            },
                            method: "delete",
                            url: "https://note-maker02.herokuapp.com/note/Delete",
                            data: { _id: _id },
                          });
                        }}
                      >
                        <img src={deleteSvg} alt="delete_button" />
                      </button>
                      <button
                        onClick={() => {
                          const id = note._id;
                          console.log(id);
                          document.getElementById(id).style.display = "flex";
                        }}
                      >
                        <img src={shareb} alt="delete_button" />
                      </button>
                    </div>
                    <div className="share_box" id={note._id}>
                      <input
                        type="text"
                        name="user1"
                        value={share.email}
                        onChange={(event) => {
                          const { value } = event.target;
                          const _id = note._id.toString();
                          setShare((prevInput) => {
                            return {
                              ...prevInput,
                              user1: value,
                              _id: _id,
                            };
                          });
                        }}
                      />
                      <button
                        className="share_button"
                        onClick={() => {
                          const user1 = share.user1;
                          const _id = share._id.toString();
                          console.log(share);
                          axios({
                            headers: {
                              "content-type": "application/json",
                            },
                            method: "put",
                            url: "https://note-maker02.herokuapp.com/note/shareWith",
                            data: { user1: user1, _id: _id },
                          })
                            .then((response) => {
                              const status = response.data;
                              console.log(status);
                              document.getElementById(_id).style.display =
                                "none";
                            })
                            .catch((error) => {
                              console.log(error.response);
                            });
                        }}
                      >
                        <img src={share_svg} alt="" /> Share
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      );
    }
  }
};
export default Lobby;
