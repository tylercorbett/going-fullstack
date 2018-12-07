<template>
    <form @submit.prevent="handleSubmit">
        <h3>Add Player</h3>
        <label> Name:
            <input v-model="player.name" required> 
        </label>
        <label> Number:
            <input v-model="player.number" required>
        </label>
        <label > Is a starter?:
            <input type="checkbox" v-model="player.isStarter">
        </label>
        <label>Position</label>
        <select v-if="positions"
          v-model="player.positionId"
          required
        >
            <option value="-1" disabled>Select a position</option>
            <option v-for="position in positions"
              :key="position.id"
              :value="position.id"
            >
              {{position.name}}  ({{position.type}})
            </option>
        </select>
        <button>Add</button>
    </form>
</template>

<script>
import api from '../../services/api';

function initPlayer() {
  return {
    name: '',
    positionId: -1,
    isStarter: false,
    number: ''
  };
}

export default {
  props: {
    onAdd: Function
  },
  data() {
    return {
      player: initPlayer(),
      positions: null
    };
  },
  created() {
    api.getPositions()
      .then(positions => {
        this.positions = positions;
      });
  },
  methods: {
    handleSubmit() {
      this.onAdd(this.player)
        .then(() => {
          this.player = { name: '' };
        });
    }
  }
};
</script>

<style>

</style>
