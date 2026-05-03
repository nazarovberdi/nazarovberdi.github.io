import HomeView from '@/features/index/HomeView.vue'
import BlogIndexView from '@/features/blog/BlogIndexView.vue'
import BlogPostView from '@/features/blog/BlogPostView.vue'
import OSSRoadmap from '@/features/oss-roadmap/OSSRoadmap.vue'
import NotFoundView from '@/features/not-found/NotFoundView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, behavior: 'smooth' }),
  routes: [
    { name: 'home', component: HomeView, path: '/' },
    { name: 'Goals', component: OSSRoadmap, path: '/goals' },
    { name: 'blog', component: BlogIndexView, path: '/blog' },
    { name: 'blog-post', component: BlogPostView, path: '/blog/:slug' },
    { name: 'not-found', component: NotFoundView, path: '/:pathMatch(.*)*' },
  ],
})

export default router
