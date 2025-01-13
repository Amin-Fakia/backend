const express = require('express');
const router = express.Router();
const db = require('../../db'); // Correctly import the db module

router.get('/:eventId', (req, res, next) => {
    const eventId = req.params.eventId;

    // Query to get people associated with the event
    const peopleQuery = `SELECT p.* FROM people p
                         JOIN event_people ep ON p.person_id = ep.person_id
                         WHERE ep.event_id = ?`;

    // Query to get objects associated with the event
    const objectsQuery = `SELECT o.* FROM objects o
                          JOIN event_objects eo ON o.object_id = eo.object_id
                          WHERE eo.event_id = ?`;

    db.all(peopleQuery, [eventId], (err, people) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        db.all(objectsQuery, [eventId], (err, objects) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            res.status(200).json({
                message: "Event details retrieved successfully",
                eventId: eventId,
                people: people,
                objects: objects
            });
        });
    });
});

module.exports = router;