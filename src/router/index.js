import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '@/views/InicioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'text-orange-500',
  linkExactActiveClass: 'text-orange-500',
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: InicioView
    },
    {
      path: '/favoritos',
      name: 'favoritos',
      component: () => import('../views/FavoritosView.vue')
    },
  ],
})

export default router
