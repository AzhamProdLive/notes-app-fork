import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useParams } from "react-router-dom";
import "./App.css";
import Note from "./components/Note";

function App() {
  // déclarer l'état pour stocker les notes
  const [notes, setNotes] = useState(null);

  // Fonction pour récupérer les notes
  async function fetchNotes() {

    const response = await fetch("http://localhost:3000/notes");
    try {
      const data = await response.json();
      setNotes(data);
      console.log("Fetching")
    } catch (error) {
      console.log(error);
    }

  }

  // Fonction pour récupérer une note avec son id
  async function fetchNoteById(noteId) {

    const response = await fetch(`http://localhost:3000/notes/${noteId}`);
    try {
      const data = await response.json();
      setNotes(data);
      console.log("Fetching id" + noteId)
    } catch (error) {
      console.log(error);

    }

  }

  // Fonction pour supprimer une note
  async function deleteNote(noteId) {
    try {
      await fetch(`http://localhost:3000/notes/${noteId}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });
      fetchNotes();
      console.log("Deleting")
    } catch (error) {
      console.log(error);
    }
  }

  // Fonction pour créer une note

  async function createNote() {
    try {
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        body: JSON.stringify({ title: "Nouvelle note", content: "" }),
        headers: { "Content-type": "application/json" },
      });

      const newNote = await response.json(); // Assurez-vous que cette réponse contient l'ID de la nouvelle note
      fetchNotes();
      console.log("Creating");

      // Naviguer vers la nouvelle note
      Navigate(`/notes/${newNote.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    fetchNotes();
  }, []);

  return (
      <BrowserRouter>
        <aside className="Side">
          <div>
            <button className="Button Button-create-note" onClick={createNote}>
              +
            </button>
            {notes !== null ? (
                <ol className="Notes-list">
                  {notes.map((note) => (
                      <li key={note.id} className="Note-item">
                        <Link className="Note-link" to={`/notes/${note.id}`}>
                          {note.title}
                        </Link>
                        <button
                            className="Button-delete"
                            onClick={() => deleteNote(note.id).then(fetchNotes).catch(console.error)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="24" height="24">
                            {<g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                              <path d="M 76.777 2.881 H 57.333 V 2.412 C 57.333 1.08 56.253 0 54.921 0 H 35.079 c -1.332 0 -2.412 1.08 -2.412 2.412 v 0.469 H 13.223 c -1.332 0 -2.412 1.08 -2.412 2.412 v 9.526 c 0 1.332 1.08 2.412 2.412 2.412 h 63.554 c 1.332 0 2.412 -1.08 2.412 -2.412 V 5.293 C 79.189 3.961 78.109 2.881 76.777 2.881 z" fill="rgb(0,0,0)" />
                              <path d="M 73.153 22.119 H 16.847 c -1.332 0 -2.412 1.08 -2.412 2.412 v 63.057 c 0 1.332 1.08 2.412 2.412 2.412 h 56.306 c 1.332 0 2.412 -1.08 2.412 -2.412 V 24.531 C 75.565 23.199 74.485 22.119 73.153 22.119 z M 33.543 81.32 c 0 1.332 -1.08 2.412 -2.412 2.412 h -2.245 c -1.332 0 -2.412 -1.08 -2.412 -2.412 V 30.799 c 0 -1.332 1.08 -2.412 2.412 -2.412 h 2.245 c 1.332 0 2.412 1.08 2.412 2.412 V 81.32 z M 48.535 81.32 c 0 1.332 -1.08 2.412 -2.412 2.412 h -2.245 c -1.332 0 -2.412 -1.08 -2.412 -2.412 V 30.799 c 0 -1.332 1.08 -2.412 2.412 -2.412 h 2.245 c 1.332 0 2.412 1.08 2.412 2.412 V 81.32 z M 63.526 81.32 c 0 1.332 -1.08 2.412 -2.412 2.412 h -2.245 c -1.332 0 -2.412 -1.08 -2.412 -2.412 V 30.799 c 0 -1.332 1.08 -2.412 2.412 -2.412 h 2.245 c 1.332 0 2.412 1.08 2.412 2.412 V 81.32 z" fill="rgb(0,0,0)" />
                            </g>}
                          </svg>
                        </button>
                      </li>
                  ))}
                </ol>
            ) : null}
          </div>
        </aside>
        <main className="Main">
          <Routes>

            <Route path="/" element="Sélectionner une note" />
            <Route path="/notes/:id" element={<Note />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </BrowserRouter>
  );
}

export default App;