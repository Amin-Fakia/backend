const express = require('express');
const router = express.Router();
const db = require('../../db'); // Correctly import the db module

router.get('/', (req, res, next) => {
    db.all('SELECT * FROM events', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({
            message: "Handling GET requests to /events",
            events: rows
        });
    });
});

router.post('/', (req, res, next) => {
    const { event_name, from_date, until_date } = req.body;
    db.run(`INSERT INTO events (event_name, from_date, until_date) VALUES (?, ?, ?)`,
        [event_name, from_date, until_date],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({
                message: "Handling POST requests to /events",
                event_id: this.lastID
            });
        });
});

router.get('/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    db.get('SELECT * FROM events WHERE event_id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.status(200).json({
                message: "You passed an ID",
                event: row
            });
        } else {
            res.status(404).json({
                message: "Event not found"
            });
        }
    });
});

router.patch('/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    const { event_name, from_date, until_date } = req.body;
    db.run(`UPDATE events SET event_name = ?, from_date = ?, until_date = ? WHERE event_id = ?`,
        [event_name, from_date, until_date, id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(200).json({
                message: "Updated event",
                changes: this.changes
            });
        });
});

router.delete('/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    db.run('DELETE FROM events WHERE event_id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({
            message: "Deleted event",
            changes: this.changes
        });
    });
});

module.exports = router;