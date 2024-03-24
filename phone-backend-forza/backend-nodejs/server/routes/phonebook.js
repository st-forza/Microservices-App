const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Get all entries
router.get('/', async (req, res) => {
    try {
        const allEntries = await db.query('SELECT * FROM entries');
        res.json(allEntries.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Create a new entry
router.post('/', async (req, res) => {
    try {
        const { name, number } = req.body;
        const newEntry = await db.query('INSERT INTO entries (name, number) VALUES ($1, $2) RETURNING *', [name, number]);
        res.json(newEntry.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update an entry
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, number } = req.body;
        const updateEntry = await db.query('UPDATE entries SET name = $1, number = $2 WHERE id = $3 RETURNING *', [name, number, id]);
        res.json(updateEntry.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Delete an entry
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM entries WHERE id = $1', [id]);
        res.json('Entry was deleted');
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
