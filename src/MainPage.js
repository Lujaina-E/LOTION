import React, { useEffect } from "react";
import { useState } from "react";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import { Link, Outlet, useNavigate, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";


function MainPage() {
// localStorage.clear()

  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );
  const hidden_menu = () => {
    setdone_set(!dont_set);
  };

  const {id} = useParams()
  
  const highlight = (Testid) => {
  
    if (id === Testid) {
      console.log("here");
      return "new-note activity-here";
    } else {
      return "new-note";
    }
  };

  const titleExtender = (title) => {
    if (title.length > 20) {
      return title.substring(0, 20) + "...";
    } else {
      return title;
    }
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  });

  const [dont_set, setdone_set] = useState(true);

  const theDate = new Date();
  theDate.setMinutes(theDate.getMinutes() - theDate.getTimezoneOffset());
  let date = theDate.toISOString().slice(0, 16);

  const nav = useNavigate(); //uses the navigate hook to redirect to the base page

  const addNote = () => {
    const newNote = {
      id: uuidv4(),
      title: "Untitled",
      date: date,
      body: "...",
    };
    setNotes([newNote, ...notes]); //list comprehenison
    console.log(notes);
    nav("/edit/" + newNote.id, { replace: true });
  };

  if(notes.length === 0){
    <div className="no-note-selected">No Note selected</div>
}

  const onSaveNote = (note) => {
    setNotes(notes.map((item) => (item.id === note.id ? note : item)));
  };

  useEffect(() => {
    nav(`/base/`, { replace: true });
  }, []);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const fixDate = (dte) => {
    const changed = new Date(dte).toLocaleDateString("en-US", options);
    if (changed !== "Invalid Date") return changed;
    return "";
  };

  console.log(notes)

  const textFormatter = (text) => {
    if (text !== undefined) {
    const noteText = (text.substring(0, 25) + '...').replace(/<[^>]*>?/gm,
    "");

    if (noteText.length > 20) {
      return noteText.substring(0, 20) + "...";
    } else {
      return noteText;
    }
    }
    return "...";
  };

  return (
    <>
      <div className="header">
        <div className="menu-element">
          <button className="menu-item" onClick={hidden_menu}>
            &#x2630;
          </button>
        </div>

        <div className="header-name">
          <h1>Lotion</h1>
          <h4>Like Notion, but worse.</h4>
        </div>

        <div className="empty-space"></div>
      </div>
      <div className="pageContent">
        {dont_set && (
          <div className="note-list">
            <div className="note-list-header">
              <div className="note-namer">
                <div className="note-add-element">
                  <div className='list-of-notes'>Notes &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp;
                  </div>

                  <button className="new-note-button" onClick={addNote}> 
                 &#x2b;
                  </button>
                </div>
              </div>

              <div className="all-notes">

              { notes.length === 0 && <div className="no-note-selected"> No note selected</div>}
                
                {notes.map((note) => (
                  
                  <Link to={`/view/${note.id}`} key={`${note.id}`}>
                    <li className={highlight(note.id)}>
                      <div className="note-card-element">
                        <div className="current-note-card">
                          <h3 className="note-card-title"> {titleExtender(note.title)}</h3>
                          <h6 className="note-card-date">
                            {fixDate(note.date)}
                          </h6>
                          <p className="note-card-description">{textFormatter(note.content)}</p>
                        </div>
                      </div>
                    </li>
                  </Link>
                ))}

              </div>
            </div>
          </div>
        )}

        <div className="current-view">
          <Outlet context={[notes, setNotes, onSaveNote]} />
        </div>
      </div>
    </>
  );
}

export default MainPage;
