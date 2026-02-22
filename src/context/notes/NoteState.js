import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // fetch Notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/note/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk5NGE2YTNkMTYzNmM0YzAyMDAzNDA0In0sImlhdCI6MTc3MTY2NDUxNn0.v74QZc9xISDJOg9KF_nDTxswxWermZjOSlrLS4BAMFM",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/note/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk5NGE2YTNkMTYzNmM0YzAyMDAzNDA0In0sImlhdCI6MTc3MTY2NDUxNn0.v74QZc9xISDJOg9KF_nDTxswxWermZjOSlrLS4BAMFM",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        tag: tag,
      }),
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete Note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/note/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk5NGE2YTNkMTYzNmM0YzAyMDAzNDA0In0sImlhdCI6MTc3MTY2NDUxNn0.v74QZc9xISDJOg9KF_nDTxswxWermZjOSlrLS4BAMFM",
      },
    });
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  return (
    // <NoteContext.Provider value={state}>{props.children}</NoteContext.Provider>
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
