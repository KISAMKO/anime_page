import { createRouter, createWebHistory } from 'vue-router'

import AnimeView from '../components/Anime.vue'
import SubView from '../components/Sub.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect:'/anime' },
        { path: '/anime', component: AnimeView },
        { path: '/sub', component: SubView },
    ],
})

export default router