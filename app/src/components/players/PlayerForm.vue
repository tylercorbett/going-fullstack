<template>
    <form @submit.prevent="onSubmit(player)">
        <p>
            <label>Name:</label>
            <input v-focus v-model="player.name" require>
        </p>
        <p>
            <label>Number:</label>
            <input type="number"
            v-model="player.number"
            required>
        </p>
        <p>
            <label>Position:</label>
            <select v-if="positions"
            v-model="player.positionId"
            required
            >
            <option value="-1" disabled>Select a position</option>
            <option v-for="position in positions"
            :key="position.id"
            :value="position.id"
            >
            {{position.name}} ({{position.type}})
            </option>
            </select>
        </p>

        <button>{{label || 'Add'}}</button>
    </form>
</template>

<script>
import api from '../../services/api';

function initPlayer() {
  return {
    name: '',
    number: '',
    positionId: -1,
  };
}

function copyPlayer(player) {
  return {
    id: player.id,
    name: player.name,
    number: player.number,
    positionId: player.positionId
  };
}

export default {
  props: {
    onSubmit: Function,
    label: String,
    playerToEdit: Object
  },
  data() {
    return {
      player: this.playerToEdit
        ? copyPlayer(this.playerToEdit)
        : initPlayer(),
      positions: null
    };
  },
  created() {
    api.getPositions()
      .then(positions => {
        this.positions = positions;
      });
  }

};
</script>

<style>

</style>
