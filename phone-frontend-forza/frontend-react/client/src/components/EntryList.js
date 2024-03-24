import React from 'react';

function EntryList({ entries, editEntry, deleteEntry }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {entries.length > 0 ? (
                    entries.map(entry => (
                        <tr key={entry.id}>
                            <td>{entry.name}</td>
                            <td>{entry.number}</td>
                            <td>
                                <button onClick={() => editEntry(entry)}>Edit</button>
                                <button onClick={() => deleteEntry(entry.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={3}>No entries found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default EntryList;
