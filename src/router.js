import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './landingpage.vue'
import BlogPage from './BlogPage.vue'
import PrivacyPolicy from './PrivacyPolicy.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage
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
  // Redesign candidates for review in staging; lazy-loaded so the current site stays unaffected
  {
    path: '/v1',
    name: 'HomeV1',
    component: () => import('./redesign/LandingV1.vue')
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
