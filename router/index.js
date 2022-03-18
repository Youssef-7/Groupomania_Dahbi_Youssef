import { createRouter, createWebHashHistory } from 'vue-router'
import PageConnexion from '../views/PageConnexion.vue'
import PageAccueil from '../views/PageAccueil.vue'
import PageCommentaire from '../views/PageCommentaire.vue'


const routes = [
  {
    path: '/',
    name: 'PageConnexion',
    component: PageConnexion
  },
  {
    path: '/PageAccueil',
    name: 'PageAccueil',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PageAccueil
  },
    {
    path: '/PageCommentaire',
    name: 'PageCommentaire',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: PageCommentaire
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
