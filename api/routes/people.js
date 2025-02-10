const express = require('express');
const router = express.Router();
const db = require('../../db'); // Correctly import the db module

router.get('/', (req, res, next) => {
    db.all('SELECT * FROM people', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({
            message: "Handling GET requests to /people",
            people: rows
        });
    });
});

router.post('/', (req, res, next) => {
    const { name, phone, email } = req.body;
    db.run(`INSERT INTO people (name, phone, email) VALUES (?, ?, ?)`,
        [name, phone, email],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({
                message: "Handling POST requests to /people",
                person_id: this.lastID
            });
        });
});

router.get('/:personId', (req, res, next) => {
    const id = req.params.personId;
    db.get('SELECT * FROM people WHERE person_id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.status(200).json({
                message: "You passed an ID",
                person: row
            });
        } else {
            res.status(404).json({
                message: "Person not found"
            });
        }
    });
});

router.patch('/:personId', (req, res, next) => {
    const id = req.params.personId;
    const { name, age, email } = req.body;
    db.run(`UPDATE people SET name = ?, age = ?, email = ? WHERE person_id = ?`,
        [name, age, email, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({
                message: "Updated person",
                changes: this.changes
            });
        });
});

router.delete('/:personId', (req, res, next) => {
    const id = req.params.personId;
    db.run('DELETE FROM people WHERE person_id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({
            message: "Deleted person",
            changes: this.changes
        });
    });
});

module.exports = router;