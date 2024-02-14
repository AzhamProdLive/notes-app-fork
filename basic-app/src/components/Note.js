import { useParams, useNavigate } from "react-router-dom";
import "./Note.css";
import { useEffect, useState } from "react";

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

function Note() {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const navigate = useNavigate();

    const handleTitleChange = (event) => {
        setNote(prevNote => ({
            ...prevNote,
            title: event.target.value
        }));
    }

    const handleContentChange = (event) => {
        setNote(prevNote => ({
            ...prevNote,
            content: event.target.value
        }));
    }

    const saveNote = async (event) => {
        event.preventDefault();

        await fetchData(`http://localhost:3000/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        });

        fetchNote();
        navigate('/'); // or wherever you want to redirect the user after saving
    };

    async function fetchNote() {
        const data = await fetchData(`http://localhost:3000/notes/${id}`);
        setNote(data);
    }

    useEffect(function () {
        fetchNote();
    }, [id]);

    if (!note) {
        return "Chargement...";
    }

    return (
        <form className="Form" onSubmit={saveNote}>
            <input
                className="Note-editable Note-title"
                type="text"
                value={note.title}
                onChange={handleTitleChange}
            />
            <textarea
                className="Note-editable Note-content"
                value={note.content}
                onChange={handleContentChange}
            />
            <div className="Note-actions">
                <button className="Button" type="submit">Enregistrer</button>
            </div>
        </form>
    );
}

export default Note;