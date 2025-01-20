const express = require('express');
const router = express.Router();
const db = require('../../db'); // Correctly import the db module

router.get('/', (req, res, next) => {
    db.all('SELECT * FROM objects', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({
            message: "Handling GET requests to /objects",
            objects: rows
        });
    });
});

router.post('/', (req, res, next) => {
    const { object_name, imLager, categorie, beschreibung, assignedEvent} = req.body;
    db.run(`INSERT INTO objects (object_name, imLager, categorie, beschreibung, assignedEvent) VALUES (?, ?, ?, ?, ?)`,
      [object_name, imLager, categorie, beschreibung, assignedEvent],
      function (err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        const objectId = this.lastID;
        db.get(`SELECT * FROM objects WHERE object_id = ?`, [objectId], (err, row) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          res.status(201).json(row);
        });
      });
  });

router.get('/:objectId', (req, res, next) => {
    const id = req.params.objectId;
    db.get('SELECT * FROM objects WHERE object_id = ?', [id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (row) {
            res.status(200).json({
                message: "You passed an ID",
                object: row
            });
        } else {
            res.status(404).json({
                message: "Object not found"
            });
        }
    });
});

router.patch('/:objectId', (req, res, next) => {
    const id = req.params.objectId;
    const fields = req.body;
    const keys = Object.keys(fields);
    const values = Object.values(fields);

    if (keys.length === 0) {
        res.status(400).json({ error: "No fields to update" });
        return;
    }

    const setClause = keys.map(key => `${key} = ?`).join(', ');
    const sql = `UPDATE objects SET ${setClause} WHERE object_id = ?`;

    db.run(sql, [...values, id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({
            message: "Updated object",
            changes: this.changes
        });
    });
});

router.delete('/:objectId', (req, res, next) => {
    const id = req.params.objectId;
    db.run('DELETE FROM objects WHERE object_id = ?', [id], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json({
            message: "Deleted object",
            changes: this.changes
        });
    });
});

module.exports = router;