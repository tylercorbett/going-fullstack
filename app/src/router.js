import VueRouter from 'vue-router';
import Players from './components/players/Players.vue';

export default new VueRouter({
  routes: [
    { path: '/', component: Players },
    { path: '*', redirect: '/' }
  ]
});