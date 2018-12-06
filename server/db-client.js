const pg = require('pg');

const Client = pg.Client;

const databaseUrl = 'postgres://localhost:5432/team';

const client = new Client(databaseUrl);

client.connect()
  .then(() => console.log('connected to db, Skynet is live', databaseUrl))
  .catch(err => console.error('connection error', err));

client.on('error', err => {
  console.error('**** DATABASE ERROR ****\n\n', err);
});

module.exports = client;