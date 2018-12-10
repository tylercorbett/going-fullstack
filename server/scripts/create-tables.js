const client = require('../db-client');

client.query(`
  CREATE TABLE IF NOT EXISTS positions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    type VARCHAR(256) NOT NULL
    );
  CREATE TABLE IF NOT EXISTS players (
      id SERIAL PRIMARY KEY,
      name VARCHAR(256) NOT NULL,
      number INTEGER NOT NULL,
      is_starter BOOLEAN DEFAULT FALSE,
      position_id INTEGER NOT NULL REFERENCES positions(id)
  );
`)
  .then(
    () => console.log('create tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });