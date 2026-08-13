const API_URL = "http://localhost:5000/api/notes";

let editingNoteId = null;

// Get all notes
async function getNotes() {
    try {
        const response = await fetch(API_URL);
        const notes = await response.json();

        displayNotes(notes);
    } catch (error) {
        console.error("Error fetching notes:", error);
    }
}

// Display notes
function displayNotes(notes) {
    const container = document.getElementById("notesContainer");

    container.innerHTML = "";

    if (notes.length === 0) {
        container.innerHTML = "📭 No notes yet. Create your first note!";
        return;
    }

    notes.forEach((note) => {
        const noteElement = document.createElement("div");

        noteElement.className = "note";

        noteElement.innerHTML = `
    <h3>${note.title}</h3>

    <p>${note.content}</p>

    <small>
        📅 Created: ${new Date(note.createdAt).toLocaleString()}
    </small>

    <br><br>

    <button class="edit-btn"
        onclick="editNote('${note._id}', '${escapeQuotes(note.title)}', '${escapeQuotes(note.content)}')">
        Edit
    </button>

    <button class="delete-btn"
        onclick="deleteNote('${note._id}')">
        Delete
    </button>
`;
        container.appendChild(noteElement);
    });
}

// Escape quotes
function escapeQuotes(text) {
    return text
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r");
}

// Create or update note
async function saveNote() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) {
        alert("Please enter both title and content.");
        return;
    }

    try {
        let response;

        if (editingNoteId) {

            // UPDATE
            response = await fetch(`${API_URL}/${editingNoteId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    content
                })
            });

        } else {

            // CREATE
            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    content
                })
            });
        }

        if (!response.ok) {
            throw new Error("Failed to save note");
        }

        document.getElementById("title").value = "";
        document.getElementById("content").value = "";

        editingNoteId = null;

        document.querySelector(".note-form button").textContent = "Save Note";

        getNotes();

    } catch (error) {
        console.error("Error saving note:", error);
        alert("Something went wrong.");
    }
}

// Edit note
function editNote(id, title, content) {
    editingNoteId = id;

    document.getElementById("title").value = title;
    document.getElementById("content").value = content;

    document.querySelector(".note-form button").textContent = "🔄 Update Note";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Delete note
async function deleteNote(id) {

    const confirmDelete = confirm("Are you sure you want to delete this note?");

    if (!confirmDelete) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete note");
        }

        getNotes();

    } catch (error) {
        console.error("Error deleting note:", error);
        alert("Something went wrong.");
    }
}

// Load notes when page opens
getNotes();
async function searchNotes() {
    const searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const response = await fetch(API_URL);
    const notes = await response.json();

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchText) ||
        note.content.toLowerCase().includes(searchText)
    );

    displayNotes(filteredNotes);
}