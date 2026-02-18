const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchuser");

// Create Note: api/note/addNote
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "Name must be at least 3 characters").isLength({ min: 3 }),
    body("description", "Name must be at least 3 characters").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //   Destructuring
      const { title, description, tag } = req.body;
      //   Note Class
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();

      res.status(200).json(saveNote);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
);

// Fetch all Notes: api/note/fetchAllNotes
router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Note: api/note/updateNote/:id
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  try {
    //   Destructuring
    const { title, description, tag } = req.body;
    //   Note Class
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true },
    );
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Note: api/note/deleteNote/:id
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
