<template>
    <span>
        <button @click="show = true">Edit</button>
        <Modal v-if="show" :onClose="() => show = false">
            <PlayerForm
            :onSubmit="handleEdit"
            :playerToEdit="player"
            label="Update"
            />
        </Modal> 
    </span>
</template>

<script>
import Modal from '../shared/Modal';
import PlayerForm from './PlayerForm';

export default {
  props: {
    onEdit: Function,
    player: Object
  },
  components: {
    Modal,
    PlayerForm
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
