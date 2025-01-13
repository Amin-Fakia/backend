const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const eventsRoutes = require('./api/routes/events');
const peopleRoutes = require('./api/routes/people');
const objectsRoutes = require('./api/routes/objects');
const eventPeopleRoutes = require('./api/routes/eventPeople');
const eventObjectsRoutes = require('./api/routes/eventObjects');
const eventDetailsRoutes = require('./api/routes/eventDetails'); // Import the new route

app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/events', eventsRoutes);
app.use('/people', peopleRoutes);
app.use('/objects', objectsRoutes);
app.use('/eventPeople', eventPeopleRoutes);
app.use('/eventObjects', eventObjectsRoutes);
app.use('/eventDetails', eventDetailsRoutes); // Use the new route

app.use((req,res,next)=> {
    const error = new Error('Not found');
    error.status(404);
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})

module.exports = app;