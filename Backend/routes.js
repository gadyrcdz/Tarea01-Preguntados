const express = require('express');
const routes = express.Router();

// Ruta para /api
routes.get('/api', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      return res.send(err);
    }
    conn.query('SELECT * FROM preguntas', (err, rows) => {
      if (err) {
        return res.send(err);
      }
      res.json(rows);
    });
  });
});


routes.post('/api', (req, res) => {
    req.getConnection((err, conn) => {
      if (err) {
        return res.send(err);
      }
      conn.query('INSERT INTO preguntas set ?', [req.body], (err, rows) => {
        if (err) {
          return res.send(err);
        }
        res.send('se agrego');
      });
    });
  });

module.exports = routes;
