import React from "react";
import Notes from "./Notes";
import AddNote from "./AddNote";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Home() {
  return (
    <>
      <AddNote />
      <Notes />
    </>
  );
}
