import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EntryForm from './EntryForm';
import EntryList from './EntryList';

function Phonebook() {
    const [entries, setEntries] = useState([]);
    const [currentEntry, setCurrentEntry] = useState({ id: null, name: '', number: '' });
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/api/phonebook')
            .then(response => {
                setEntries(response.data);
            })
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const addEntry = entry => {
        axios.post('http://localhost:3001/api/phonebook', entry)
            .then(response => {
                setEntries([...entries, response.data]);
            })
            .catch(error => console.error('Error adding entry: ', error));
    };

    const deleteEntry = id => {
        axios.delete(`http://localhost:3001/api/phonebook/${id}`)
            .then(() => {
                setEntries(entries.filter(entry => entry.id !== id));
            })
            .catch(error => console.error('Error deleting entry: ', error));
    };

    const editEntry = entry => {
        setEditing(true);
        setCurrentEntry({ id: entry.id, name: entry.name, number: entry.number });
    };

    const updateEntry = (id, updatedEntry) => {
        axios.put(`http://localhost:3001/api/phonebook/${id}`, updatedEntry)
            .then(() => {
                setEntries(entries.map(entry => (entry.id === id ? updatedEntry : entry)));
                setEditing(false);
                setCurrentEntry({ id: null, name: '', number: '' });
            })
            .catch(error => console.error('Error updating entry: ', error));
    };

    return (
        <div className="phonebook-container">
            {editing ? (
                <EntryForm
                    editing={editing}
                    setEditing={setEditing}
                    currentEntry={currentEntry}
                    updateEntry={updateEntry}
                />
            ) : (
                <EntryForm addEntry={addEntry} />
            )}
            <EntryList entries={entries} editEntry={editEntry} deleteEntry={deleteEntry} />
        </div>
    );
}

export default Phonebook;
