<template>
    <section>
        <h2> Position Admin</h2>
        <ul>
            <li v-for="position in positions"
                :key="position.id">
                {{position.name}}
            </li>
        </ul>
        <form @submit.prevent="handleAdd">
            <input v-model="positionName">
            <button>Add</button>
        </form>
    </section>
</template>

<script>
import api from '../../services/api';

export default {
  data() {
    return {
      positions: null,
      positionName: ''
    };
  },
  created() {
    api.getPositions()
      .then(positions => {
        this.positions = positions;
      });
  },
  methods: {
    handleAdd() {
      api.addPosition({ name: this.positionName })
        .then(() => {
          this.positionName = '';
        });
    }
  }
};
</script>

<style>

</style>
