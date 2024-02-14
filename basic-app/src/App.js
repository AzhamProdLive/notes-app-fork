import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate, useParams, useNavigate } from "react-router-dom";
import "./App.css";
import Note from "./components/Note";

async function fetchData(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    // Set error state here
  }
}

function App() {
  const [notes, setNotes] = useState(null);
  const navigate = useNavigate();

  async function fetchNotes() {
    const data = await fetchData("http://localhost:3000/notes");
    setNotes(data);
  }

  async function deleteNote(noteId) {
    await fetchData(`http://localhost:3000/notes/${noteId}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    });
    fetchNotes();
  }

  async function createNote() {
    const newNote = await fetchData("http://localhost:3000/notes", {
      method: "POST",
      body: JSON.stringify({ title: "Nouvelle note", content: "" }),
      headers: { "Content-type": "application/json" },
    });
    fetchNotes();
    navigate(`/notes/${newNote.id}`);
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