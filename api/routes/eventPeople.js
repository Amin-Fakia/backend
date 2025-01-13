const express = require('express');
const router = express.Router();
const db = require('../../db'); // Correctly import the db module

router.post('/', (req, res, next) => {
    const { event_id, person_id } = req.body;
    db.run(`INSERT INTO event_people (event_id, person_id) VALUES (?, ?)`,
        [event_id, person_id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({
                message: "Person added to event",
                id: this.lastID
            });
        });
});

module.exports = router;