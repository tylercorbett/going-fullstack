const client = require('../db-client');

client.query(`
  DROP TABLE IF EXISTS players;
  DROP TABLE IF EXISTS positions;
  `)
  .then(
    () => console.log('drop tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });