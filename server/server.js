const express = require('express');
const app = express();
const morgan = require('morgan');
const client = require('./db-client.js');

app.use(morgan('dev'));

app.use(express.json());

app.get('/api/players', (req, res) => {
  client.query(`
    SELECT * FROM players;
  `)
    .then(results => {
      res.json(results.rows);
    });
});

app.get('/api/players/:id', (req, res) => {
  client.query(`
    SELECT * FROM players WHERE id = $1;
  `,
  [req.params.id])
    .then(result => {
      res.json(result.rows[0]);
    });
});

app.post('/api/players', (req, res) => {
  const body = req.body;

  client.query(`
    INSERT INTO players (name, number, is_starter)
    VALUES($1, $2, $3)
    RETURNING id, name, number, is_starter as "isStarter";
  `,
  [body.name, body.number, body.isStarter])
    .then(result => {
      res.json(result.rows[0]);
    });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('server app started on port', PORT);
});