import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue';
import PlaylistsView from '../views/PlaylistsView.vue';
import SearchView from '../views/SearchView.vue';
import SearchView2 from '../views/SearchView2.vue';
import InfoView from '@/views/InfoView.vue';
import AlbumView from '@/views/AlbumView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/playlists',
    name: 'Playlists',
    component: PlaylistsView,
  },
  {
    path: '/search',
    name: 'Buscador',
    component: SearchView,
  },
  {
    path: '/search2',
    name: 'Buscador2',
    component: SearchView2,
  },
  {
    path: '/artist/:id',
    name: 'InfoView',
    component: InfoView,
  },
  {
    path: '/album/:id',
    name: 'AlbumView',
    component: AlbumView,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
