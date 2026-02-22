import React, { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import NotesItem from "./NotesItem";

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    getNotes();
    // eslint - disable - next - line;
  }, []);
  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Tag</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {notes.map((note) => {
              return <NotesItem key={note._id} note={note} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
