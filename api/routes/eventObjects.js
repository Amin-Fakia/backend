const express = require('express');
const router = express.Router();
const db = require('../../db'); // Correctly import the db module

router.post('/', (req, res, next) => {
    const { event_id, object_id } = req.body;
    db.run(`INSERT INTO event_objects (event_id, object_id) VALUES (?, ?)`,
        [event_id, object_id],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({
                message: "Object added to event",
                id: this.lastID
            });
        });
});

module.exports = router;