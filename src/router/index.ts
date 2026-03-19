import HomeView from '@/features/index/HomeView.vue'
import OSSRoadmap from '@/features/oss-roadmap/OSSRoadmap.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      component: HomeView,
      path: '/',
    },
    {
      name: 'Goals',
      component: OSSRoadmap,
      path: '/goals',
    },
  ],
})

export default router
