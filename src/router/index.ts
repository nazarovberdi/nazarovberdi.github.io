import BlogIndexView from '@/features/blog/BlogIndexView.vue'
import BlogPostView from '@/features/blog/BlogPostView.vue'
import HomeView from '@/features/index/HomeView.vue'
import NotFoundView from '@/features/not-found/NotFoundView.vue'
import OSSRoadmap from '@/features/oss-roadmap/OSSRoadmap.vue'
import type { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** Shown on the Panel transition while it covers the screen. */
    label?: string
  }
}

export const routes: RouteRecordRaw[] = [
  { name: 'home', component: HomeView, path: '/', meta: { label: 'Home' } },
  { name: 'Goals', component: OSSRoadmap, path: '/goals', meta: { label: 'Goals' } },
  { name: 'blog', component: BlogIndexView, path: '/blog', meta: { label: 'Writing' } },
  { name: 'blog-post', component: BlogPostView, path: '/blog/:slug', meta: { label: 'Writing' } },
  { name: 'not-found', component: NotFoundView, path: '/:pathMatch(.*)*', meta: { label: 'Lost' } },
]
