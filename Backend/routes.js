const express = require('express');
const routes = express.Router();

// Ruta para la obtener las preguntas
routes.get('/questions', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      return res.send(err);
    }
    conn.query('SELECT * FROM pregunta', (err, rows) => {
      if (err) {
        return res.send(err);
      }
      res.json(rows);
    });
  });
});

//ruta para hacer la insercion de los jugadores en el historial
routes.post('/history', (req, res) => {
    req.getConnection((err, conn) => {
      if (err) {
        return res.send(err);
      }
      conn.query('INSERT INTO historial set ?', [req.body], (err, rows) => {
        if (err) {
          return res.send(err);
        }
        res.send('se agrego');
      });
    });
  });

// Ruta para la obtener el historial
routes.get('/historial', (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      return res.send(err);
    }
    conn.query('SELECT * FROM historial', (err, rows) => {
      if (err) {
        return res.send(err);
      }
      res.json(rows);
    });
  });
});

module.exports = routes;
