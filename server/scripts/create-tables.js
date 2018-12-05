const pg = require('pg');

const Client = pg.Client;

const databaseUrl = 'postgres://localhost:5432/team';

const client = new Client(databaseUrl);

client.connect()
  .then(() => {
    return client.query(`
        CREATE TABLE IF NOT EXISTS players (
            id SERIAL PRIMARY KEY,
            name VARCHAR(256) NOT NULL,
            number INTEGER NOT NULL,
            is_starter BOOLEAN
        );
        `);
  })
  .then(
    () => console.log('create tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });