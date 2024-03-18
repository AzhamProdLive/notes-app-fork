import React, { useState, useEffect } from 'react';
import noteContext from './components/noteContext';
import { fetchNotes } from './api';

export function NoteProvider({ children }) {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        // Fetch notes from the server when the component mounts
        fetchNotesFromServer();
    }, []);

    const fetchNotesFromServer = async () => {
        // Fetch notes from the server and update the state
        const data = await fetchNotes();
        setNotes(data);
    };

    return (
        <noteContext.Provider value={{ fetchNotes: fetchNotesFromServer }}>
            {children}
        </noteContext.Provider>
    );
}