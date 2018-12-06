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
        <button>Add</button>
    </form>
</template>

<script>
export default {
  props: {
    onAdd: Function
  },
  data() {
    return {
      player: {
        name: '',
        number: '',
        isStarter: false
      }
    };
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
