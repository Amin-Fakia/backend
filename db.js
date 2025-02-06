const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./events.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS events (
            event_id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_name TEXT,
            from_date TEXT,
            until_date TEXT,
            location TEXT,
            beschreibung TEXT,
            notizen TEXT,
            color TEXT,

        )`, (err) => {
            if (err) {
                console.error('Error creating events table:', err.message);
            } else {
                console.log('Events table created or already exists.');
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS people (
            person_id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone TEXT,
            assignedEvent TEXT,
            notizen TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating people table:', err.message);
            } else {
                console.log('People table created or already exists.');
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS objects (
            object_id INTEGER PRIMARY KEY AUTOINCREMENT,
            object_name TEXT,
            imLager BOOLEAN,
            categorie TEXT,
            beschreibung TEXT,
            assignedEvent TEXT,
            assignedEventID INTEGER,
            notizen TEXT
        )`, (err) => {
            if (err) {
                console.error('Error creating objects table:', err.message);
            } else {
                console.log('Objects table created or already exists.');
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS event_people (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_id INTEGER,
            person_id INTEGER,
            FOREIGN KEY (event_id) REFERENCES events(event_id),
            FOREIGN KEY (person_id) REFERENCES people(person_id)
        )`, (err) => {
            if (err) {
                console.error('Error creating event_people table:', err.message);
            } else {
                console.log('Event people table created or already exists.');
            }
        });

        db.run(`CREATE TABLE IF NOT EXISTS event_objects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_id INTEGER,
            object_id INTEGER,
            FOREIGN KEY (event_id) REFERENCES events(event_id),
            FOREIGN KEY (object_id) REFERENCES objects(object_id)
        )`, (err) => {
            if (err) {
                console.error('Error creating event_objects table:', err.message);
            } else {
                console.log('Event objects table created or already exists.');
            }
        });
    }
});

module.exports = db;