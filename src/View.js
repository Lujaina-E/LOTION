import React from "react";
import { useState } from "react";
import {
  Link,
  useOutletContext,
  useParams,
  useNavigate,
} from "react-router-dom";

export default function View() {
  const [notes, setNotes, onSaveNote] = useOutletContext();
  var { id } = useParams();
  id = id.replace("}", "");
  const { navigate } = useNavigate();
  const current = notes.find((note) => note.id === id);
	const nav = useNavigate(); //uses the navigate hook to redirect to the base page


  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };


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

  const fixDate = (dte) => {
    const changed = new Date(dte).toLocaleDateString("en-US", options);
    if (changed !== "Invalid Date") return changed;
    return "";
  };

  console.log(fixDate(current.date));

  return (
    <>
      <div className="current-view">
        <div className="note-view">
          <div className="primary-title">
            <p>{current.title}</p>
            <div className="note-date">{fixDate(current.date)}</div>
          </div>

          <div className="modes">
            <Link to={`/edit/${id}}`}>
              <button className="status-change">Edit</button>
            </Link>
            <button className="status-change" onClick={deletion}>Delete</button>
          </div>
        </div>
      </div>

      <div
        className="viewing"
        dangerouslySetInnerHTML={{ __html: current.content }}
      ></div>
    </>
  );
}
