<template>
        <section class="players">
                <h2>Players</h2>
                <AddPlayer :onAdd="handleAdd"/>
                <ul v-if="players">
                        <li v-for="player in players" :key="player.id">
                </ul>
        </section>
</template>

<script>
import api from '../../services/api';
import AddPlayer from './AddPlayer';

export default {
  data() {
    return {
      players: null,
      error: null
    };
  },
  components: {
    AddPlayer
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
