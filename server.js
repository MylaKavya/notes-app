const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Note = require("./models/Note");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Notes App Server is Running!");
});

// CREATE - Add a new note
app.post("/api/notes", async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = new Note({
      title,
      content,
    });

    const savedNote = await note.save();

    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({
      message: "Error creating note",
      error: error.message,
    });
  }
});

// READ - Get all notes
app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching notes",
      error: error.message,
    });
  }
});

// UPDATE - Update a note
app.put("/api/notes/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({
      message: "Error updating note",
      error: error.message,
    });
  }
});

// DELETE - Delete a note
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting note",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});