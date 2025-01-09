const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to /people"
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling POST requests to /people"
    });
});

router.get('/:personId', (req, res, next) => {
    const id = req.params.personId;
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

router.patch('/:personId', (req, res, next) => {
    res.status(200).json({
        message: "Updated person"
    });
});

router.delete('/:personId', (req, res, next) => {   
    res.status(200).json({
        message: "Deleted person" 
    });
});

module.exports = router;