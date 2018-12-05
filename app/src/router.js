import VueRouter from 'vue-router';
import Players from './components/players/Players.vue';
import PlayerDetail from './components/players/PlayerDetail';

export default new VueRouter({
  routes: [
    { path: '/', component: Players },
    { path: '/players/:id', component: PlayerDetail },
    { path: '*', redirect: '/' }
  ]
});