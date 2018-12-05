const express = require('express');
const app = express();
const shortid = require('shortid');

const fs = require('fs');

function readData() {
  const data = fs.readFileSync('./data/players.json', 'utf8');
  return JSON.parse(data);
}

function saveData(players) {
  const json = JSON.stringify(players, true, 2);
  fs.writeFileSync('./data/players.json', json);
}

app.use(express.json());

app.get('/api/players', (req, res) => {
  const players = readData();
  res.json(players);
});

app.post('/api/players', (req, res) => {
  const players = readData();
  const player = req.body;
  player.id = shortid.generate();
  players.push(player);
  saveData(players);
  res.json(player);
});

const PORT = 3000;

app.listen(PORT, ()=> {
  console.log('server app started on port', PORT);
});