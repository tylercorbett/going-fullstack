const client = require('../db-client');

client.query(`
    CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        name VARCHAR(256) NOT NULL,
        number INTEGER NOT NULL,
        is_starter BOOLEAN NOT NULL
    );
    `)
  .then(
    () => console.log('create tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });