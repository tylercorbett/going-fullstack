<template>
        <section class="players">
                <h2>Players</h2>
                <h2 id="positionsLink">
                  <RouterLink to="/positions">Positions Admin</RouterLink>
                </h2>
                <AddPlayer :onAdd="handleAdd"/>
                <PlayerList
                :players="players"
                />
        </section>
</template>

<script>
import api from '../../services/api';
import AddPlayer from './AddPlayer';
import PlayerList from './PlayerList';

export default {
  data() {
    return {
      players: null,
      error: null
    };
  },
  components: {
    AddPlayer,
    PlayerList,
  },
  created() {
    api.getPlayers()
      .then(players => {
        this.players = players;
      })
      .catch(err => {
        this.error = err;
      });
  },
  methods: {
    handleAdd(player) {
      return api.addPlayer(player)
        .then(saved => {
          this.players.push(saved);
        });
    }
  }
};
</script>

<style>

</style>
