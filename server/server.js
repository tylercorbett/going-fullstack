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

  client.query(`
    INSERT INTO player (name, number, is_starter)
    VALUES($1, $2, $3)
    RETURNING id;
  `,
  [body.name, body.number, body.isStarter])
    .then(result => {
      const id = result.rows[0].id;
      return client.query(`
        SELECT
          player.id,
          player.name as name,
          is_starter as "isStarter",
          position.id as "positionId",
          position.name as position
        FROM player
        JOIN position
        ON player.position_id = position.id
        WHERE player.id = $1;
      `,
      [id]);
    })
    .then(result => {
      res.json(result.rows[0]);
    });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('server app started on port', PORT);
});