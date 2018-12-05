<template>
    <ul v-if="players">
        <li v-for="player in players" :key="player.id">
            <RouterLink :to="`/players/${player.id}`">{{player.name}}</RouterLink>
        </li>
    </ul>
</template>

<script>
export default {
  props: {
    players: null
  }
};
</script>

<style>

</style>
