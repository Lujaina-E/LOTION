import React from "react";
import { useState } from "react";
import {
  Link,
  useOutletContext,
  useParams,
  useNavigate,
  Outlet,
} from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Edit() {
  const [notes, setNotes, onSaveNote] = useOutletContext();
  var { id } = useParams();
  id = id.replace("}", "");
  const current = notes.find((note) => note.id === id);
  const [title, setTitle] = useState(current.title);
  const [content, setContent] = useState(current.content);
  const [date, setDate] = useState(current.date);
  const nav = useNavigate(); //uses the navigate hook to redirect to the base page


  const deletion = () => {
    const rep = window.confirm("Are you sure you want to delete this note?");
    if (rep) {
        const edittedFormatting = notes.filter((note) => note.id !== id);
        setNotes(edittedFormatting);
        if(edittedFormatting.length>0) {
            nav(`/view/${edittedFormatting[0].id}`, { replace: true });
        }

        if(edittedFormatting.length === 0) {
            nav(`/base/`, { replace: true });
        }
  }
}

  function saveNotes() {
    const editedNote = {
      id: id,
      title: title,
      content: content,
      date: date,
    };
    console.log(`Edited note: ${editedNote}`);
    onSaveNote(editedNote);
  }

  const [quillvalue, setquillValue] = useState("");
  return (
    <>
      <div className="current-view">
        <div className="note-view">
          <div className="primary-title">
            <input
              className="dynamic-note-title"
              value={title}
              type="text"
              placeholder="Untitled"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <div className="note-date">
              <input
                className="date-inputter"
                type="datetime-local"
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
            </div>
          </div>

          <div className="modes">
            <Link to={`/view/${id}`} key={`${id}`}>
              <button className="status-change" onClick={saveNotes}>
                Save
              </button>
            </Link>
            <button className="status-change" onClick={deletion}>Delete</button>
          </div>
        </div>
      </div>

      <div>
        <ReactQuill
          className="note-body"
          theme="snow"
          value={content}
          placeholder="Your Note Here"
          onChange={setContent}
        />
      </div>
    </>
  );
}
