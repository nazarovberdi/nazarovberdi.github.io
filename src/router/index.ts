import BlogIndexView from '@/features/blog/BlogIndexView.vue'
import BlogPostView from '@/features/blog/BlogPostView.vue'
import HomeView from '@/features/index/HomeView.vue'
import NotFoundView from '@/features/not-found/NotFoundView.vue'
import OSSRoadmap from '@/features/oss-roadmap/OSSRoadmap.vue'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  { name: 'home', component: HomeView, path: '/' },
  { name: 'Goals', component: OSSRoadmap, path: '/goals' },
  { name: 'blog', component: BlogIndexView, path: '/blog' },
  { name: 'blog-post', component: BlogPostView, path: '/blog/:slug' },
  { name: 'not-found', component: NotFoundView, path: '/:pathMatch(.*)*' },
]
