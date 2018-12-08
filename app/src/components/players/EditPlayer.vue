<template>
    <span>
        <button @click="show = true">Edit</button>
        <Modal v-if="show" :onClose="() => show = false">

        </Modal> 
    </span>
</template>

<script>
import Modal from '../shared/Modal';

export default {
  props: {
    onEdit: Function,
    player: Object
  },
  components: {
    Modal
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    handleEdit(player) {
      return this.onEdit(player)
        .then(() => this.show = false);
    }
  }
};
</script>

<style>

</style>
