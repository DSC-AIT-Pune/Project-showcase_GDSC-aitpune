import React, { useState, useEffect } from "react";
import { Router } from "react-router";
import Loading from "./loading";
import Wait from "./wait";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [more, setMore] = useState({
    More_option: false,
  });
  const [loading, setLoading] = useState({
    load: true,
  });
  const More_action = () => {
    setMore({ More_option: true });
  };

  useEffect(() => {
    fetch("https://note-maker02.herokuapp.com/note/resources")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => {
        setResources(jsonRes);
        setLoading({
          load: false,
        });
      })
      .catch(() => {
        setLoading({
          load: "noob",
        });
      });
  }, []);
  const jwt = JSON.parse(localStorage.getItem("key"));
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
          <Loading location="Finding resources" />
        </div>
      );
    } else {
      return (
        <div className="editor add2">
          <h3>My name is Resources</h3>
          <br />

          <div className="Lobby_container">
            <p>
              this is the area where you can find all of your notes . So don't
              worry just keep learning we keep your data safe for you
            </p>
            {resources.map((note) => {
              return (
                <div className="Note_output_box">
                  <h3>{note.topic}</h3>
                  <p>
                    <i>
                      {note.subject}{" "}
                      <button className="more_button" onClick={More_action}>
                        .....more
                      </button>
                    </i>
                  </p>

                  <p className="author_name_lobby">
                    <stong>BY :{note.author}</stong>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }
};

export default Resources;
