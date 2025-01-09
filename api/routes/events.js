const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    const event = {
        event_id: req.body.event_id,
        event_name: req.body.event_name,
        from_date: req.body.from_date,
        until_date: req.body.until_date
    }
    res.status(200).json({
        message: "Handling GET requests to /events"
    });
});
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling POST requests to /events"
    });
});

router.get('/:eventId', (req, res, next) => {
    const id = req.params.eventId;
    if (id === 'special') {
        res.status(200).json({
            message: "You discovered the special ID",
            id: id
        });
    } else {
        res.status(200).json({
            message: "You passed an ID"
        });
    }
});
router.patch('/:eventId', (req, res, next) => {
    res.status(200).json({
        message: "Handling PATCH requests to /events/:eventId"
    });
});
router.delete('/:eventId', (req, res, next) => {
    res.status(200).json({
        message: "Handling DELETE requests to /events/:eventId"
    });
});

module.exports = router;
    