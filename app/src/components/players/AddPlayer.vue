<template>
    <form @submit.prevent="handleSubmit">
        <label> Name:
            <input v-model="player.name" require>
        </label>
        <label> Number:
            <input v-model="player.number" require>
        </label>
        <label> Is a starter?:
            <input type="checkbox" v-model="player.isStarter" require>
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
        name: ''
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
