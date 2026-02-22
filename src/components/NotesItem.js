import React, { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";
export default function NotesItem({ note }) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  return (
    <>
      <tr>
        <td>{note.title}</td>
        <td>{note.description}</td>
        <td>{note.tag}</td>
        <td>
          <i
            className="bi bi-trash mx-1"
            onClick={() => {
              deleteNote(note._id);
            }}
          ></i>
          <i className="bi bi-pencil-square mx-1"></i>
        </td>
      </tr>
    </>
  );
}
