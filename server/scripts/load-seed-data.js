const pg = require('pg');
const Client = pg.Client;
const databaseUrl = 'postgres://localhost:5432/team';
const players = require('./players.json');

const client = new Client(databaseUrl);

client.connect()
  .then(() => {
    return Promise.all(
      players.map(player => {
        return client.query(`
                    INSERT INTO players (name, number, is_starter)
                    VALUES ($1, $2, $3);
                `,
        [player.name, player.number, player.is_starter]);
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