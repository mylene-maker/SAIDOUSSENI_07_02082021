import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import Actuality from '../views/Actuality.vue'
import AddComment from '../views/AddComment.vue'
import UpdatePost from '../views/UpdatePost.vue'
import DeletePost from '../views/DeletePost.vue'
import Admin from '../views/Admin.vue'
import DeleteAccount from '../views/DeleteAccount.vue'

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
  {
    path: '/updatePost/:postId',
    name: 'UpdatePost',
    component: UpdatePost
  },
  {
    path: '/DeletePost/:postId',
    name: 'DeletePost',
    component: DeletePost
  },
  {
    path: '/admin/:admin',
    name: 'Admin',
    component: Admin
  },
 {
    path: '/:userId',
    name: 'DeleteAccount',
    component: DeleteAccount
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
