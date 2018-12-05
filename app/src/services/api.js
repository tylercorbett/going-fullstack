export default {
  getPlayers() {
    return fetch('/api/players')
      .then(response => response.json());
  },
  addPlayer(player) {
    return fetch('/api/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(player)
    })
      .then(response => response.json());
  },
  getPlayer(id) {
    return fetch(`/api/players/${id}`)
      .then(response => response.json());
  }
};