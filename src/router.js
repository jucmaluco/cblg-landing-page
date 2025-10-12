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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
