const express = require('express');
const app = express();
const morgan = require('morgan');
const client = require('./db-client.js');

app.use(morgan('dev'));

app.use(express.json());

app.get('/api/players', (req, res) => {
  client.query(`
    SELECT
      players.id,
      players.name as name,
      is_starter as "isStarter",
      position_id as "positionsId",
      positions.name as positions
    FROM players
    JOIN positions
    ON players.position_id = positions.id
    ORDER BY players.name DESC;
  `)
    .then(result => {
      res.json(result.rows);
    });
});

app.get('/api/positions', (req, res) => {
  client.query(`
    SELECT id, name, type
    FROM positions
    ORDER BY name;
  `)
    .then(result => {
      res.json(result.rows);
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
  console.log('body, \n\n\n', body);

  client.query(`
    INSERT INTO players (name, position_id, number, is_starter)
    VALUES($1, $2, $3, $4)
    RETURNING 
      id,
      name,
      position_id as "positionId",
      number,
      is_starter
  `,
  [body.name, body.positionId, body.number, body.isStarter])
    
    .then(result => {
      res.json(result.rows[0]);
    });
});

app.put('/api/players/:id', (req, res) => {
  const body = req.body;

  client.query(`
    UPDATE players
    SET
      name = $1,
      position_id = $2,
      number = $3,
      is_starter = $4
    WHERE id = $5
    RETURNING
      id,
      name,
      position_id as "positionId",
      number,
      is_starter;
  `,
  [body.name, body.positionId, body.number, body.is_starter, req.params.id])
    .then(result => {
      res.json(result.rows[0]);
    });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('server app started on port', PORT);
});