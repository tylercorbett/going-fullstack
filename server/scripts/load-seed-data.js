const client = require('../db-client');
const players = require('./players.json');

Promise.all(
  players.map(player => {
    return client.query(`
      INSERT INTO players (name, number, is_starter)
      VALUES ($1, $2, $3);
      `,
    [player.name, player.number, player.is_starter]);
  })
)
  .then(
    () => console.log('seed data load complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });