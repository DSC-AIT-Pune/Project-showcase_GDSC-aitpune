import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import tick from "../images/tick.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import lobby from "../images/collections_bookmark.svg";
import deleteWhite from "../images/deleteWhite.svg";
import Wait from "./wait";

const Notes = () => {
  const [content, setContent] = useState({
    topic: "",
    subject: "",
    written: "",
  });
  const jwt = JSON.parse(localStorage.getItem("key"));
  const [notes, setNotes] = useState([]);
  const onNOte = (event, editor) => {
    const data = editor.getData();
    // setContent({ written: data });
    setContent((prevInput) => {
      return {
        ...prevInput,
        written: data,
      };
    }); //yha sting likha ha data ki jagah const ke aage bhi aur written ke sath bhi
    // console.log(content.written);
  };
  useEffect(() => {
    fetch("https://note-maker02.herokuapp.com/note/allSaved")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => {
        setNotes(jsonRes);
      });
  });
  const onHeading = (event) => {
    const { name, value } = event.target;
    setContent((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log(content.topic);
    console.log(content.subject);
    console.log(content.written);

    const newwrittenNotes = {
      topic: content.topic,
      subject: content.subject,
      written: content.written,
    };
    axios.post("https://note-maker02.herokuapp.com/note/writter", newwrittenNotes);
    setContent({ topic: "", subject: "", written: "" });
  };
  if (jwt != "login ho gaya") {
    return (
      <div className="editor">
        <Wait />
      </div>
    );
  } else {
    return (
      <div className="editor NotesContianer" id="editor ">
        <div className="notemaker">
          <div className="container">
            <h1>Notes</h1>
            <div>
              <div>
                <span> Topic :</span>{" "}
                <input
                  name="topic"
                  type="text"
                  onChange={onHeading}
                  value={content.topic}
                  placeholder="Heading......"
                />
              </div>
              <div>
                <span> Subject :</span>
                <input
                  name="subject"
                  type="text"
                  onChange={onHeading}
                  value={content.subject}
                  placeholder="Brief of content"
                />
              </div>
            </div>
            <div className="note_writter">
              <CKEditor
                editor={ClassicEditor}
                data={content.written}
                onChange={onNOte}
              />
            </div>

            <div className="submit_options">
              <button onClick={handleClick}>
                <img src={tick} alt="" />
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="lobbyShower">
          <div className="lobbyShower_output">
            <Link
              to="/Lobby"
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              {" "}
              All written notes
            </Link>
            {notes.map((note) => {
              if (notes.length == 0) {
                return <p>there is nothing in lobby</p>;
              } else if (notes.length != 0) {
                return (
                  <Link to="/Lobby" className="linkInNotes">
                    {" "}
                    <img src={lobby} alt="Lobby" className="component_images" />
                    {note.topic}
                    <button
                      className="deleteInNotes"
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
                      <img src={deleteWhite} alt="delete_button" />
                    </button>
                  </Link>
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
};

export default Notes;
