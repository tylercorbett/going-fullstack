let positions = null;

const getOptions = (method, data) => {
  return {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };
};

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
  },
  getPositions() {
    return fetch('/api/positions')
      .then(response => response.json());
  },
  addPosition(position) {
    return fetch('/api/positions', getOptions('POST', position))
      .then(response => response.json())
      .then(saved => {
        positions.push(saved);
        positions.sort((a, b) => {
          if(a.name > b.name) return 1;
          if(a.name < b.name) return -1;
          return 0;
        });
      });
  }
};