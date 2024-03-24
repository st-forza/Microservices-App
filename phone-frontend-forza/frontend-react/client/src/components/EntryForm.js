import React, { useState, useEffect } from 'react';

function EntryForm(props) {
    const initialFormState = { id: null, name: '', number: '' };
    const [entry, setEntry] = useState(initialFormState);

    useEffect(() => {
        if (props.editing) {
            setEntry(props.currentEntry);
        }
    }, [props]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setEntry({ ...entry, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (entry.name && entry.number) {
            props.editing ? props.updateEntry(entry.id, entry) : props.addEntry(entry);
            setEntry(initialFormState);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={entry.name} onChange={handleInputChange} />
            <label>Number</label>
            <input type="text" name="number" value={entry.number} onChange={handleInputChange} />
            <button>{props.editing ? 'Update' : 'Add'}</button>
        </form>
    );
}

export default EntryForm;
