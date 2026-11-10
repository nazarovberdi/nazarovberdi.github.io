import HomeView from '@/features/index/HomeView.vue'
import type { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** Shown on the Panel transition while it covers the screen. */
    label?: string
  }
}

export const routes: RouteRecordRaw[] = [
  { name: 'home', component: HomeView, path: '/', meta: { label: 'Home' } },
  { name: 'Goals', component: () => import('@/features/oss-roadmap/OSSRoadmap.vue'), path: '/goals', meta: { label: 'Goals' } },
  { name: 'blog', component: () => import('@/features/blog/BlogIndexView.vue'), path: '/blog', meta: { label: 'Writing' } },
  { name: 'blog-post', component: () => import('@/features/blog/BlogPostView.vue'), path: '/blog/:slug', meta: { label: 'Writing' } },
  { name: 'not-found', component: () => import('@/features/not-found/NotFoundView.vue'), path: '/:pathMatch(.*)*', meta: { label: 'Lost' } },
]
