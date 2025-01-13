import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RequestNewRideView from '@/views/RequestNewRideView.vue'
import ProfileView from '@/views/ProfileView.vue'
import ContactUsView from '@/views/ContactUsView.vue'
import SearchView from '@/views/SearchView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/request-new-ride',
      name: 'request-new-ride',
      component: RequestNewRideView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    }, 
    {
      path: '/contact',
      name: 'contact',
      component: ContactUsView,
    }, 
    { 
      path: '/search',
      name: 'search',
      component: SearchView,
    }
    
  ],
})

export default router
