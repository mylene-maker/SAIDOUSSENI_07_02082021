import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Actuality from '../views/Actuality.vue'
import AddComment from '../views/AddComment.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signin',
    name: 'Signin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signin.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/actuality',
    name: 'Actuality',
    component: Actuality
  },
  {
    path: '/addComment/:postId',
    name: 'AddComment',
    component: AddComment
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
