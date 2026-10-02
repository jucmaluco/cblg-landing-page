import { createRouter, createWebHistory } from 'vue-router'
import LandingV1 from './redesign/LandingV1.vue'
import BlogPage from './BlogPage.vue'
import PrivacyPolicy from './PrivacyPolicy.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingV1
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  // Previous home page and the alternative redesign, kept for reference; lazy-loaded
  {
    path: '/v1',
    name: 'HomeV1',
    component: () => import('./landingpage.vue')
  },
  {
    path: '/v2',
    name: 'HomeV2',
    component: () => import('./redesign/LandingV2.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
