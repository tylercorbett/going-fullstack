const client = require('../db-client');
const players = require('./players.json');
const positions = require('./positions');

Promise.all(
  positions.map(position => {
    return client.query(`
        INSERT INTO positions (name, type)
        VALUES ($1, $2);
      `,
    [position.name, position.type]);
  })
)
  .then(() => {
    return Promise.all(
      players.map(player => {
        return client.query(`
          INSERT INTO players (name, position_id, number, is_starter)
          SELECT
            $1 as name,
            id as position_id,
            $2 as number,
            $3 as is_starter
          FROM positions
          WHERE type = $4
          `,
        [player.name, player.number, player.is_starter, player.position]);
      })
    );
  })
  .then(
    () => console.log('seed data load complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });