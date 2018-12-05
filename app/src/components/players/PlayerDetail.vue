<template>
    <section v-if="player">
        <h2>{{player.name}}</h2>
        <h4>
            #{{player.number}}
        </h4>
        <h4>
            Is a starter? {{player.isStarter}}
        </h4>
    </section>
</template>

<script>
import api from '../../services/api.js';

export default {
  data() {
    return {
      player: null
    };
  },
  created() {
    api.getPlayer(this.$route.params.id)
      .then(player => {
        this.player = player;
      });
  }
};
</script>

<style>

</style>
