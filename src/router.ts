import { createRouter, createWebHistory } from "vue-router"


const routes = [
  {
    path: "/",
    beforeEnter(to: any, from: any, next: any) {
      next("/blogs")
    }
  },
  {
    path: '/blogs',
    name: 'home',
    component: () => import("./views/Home.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("./views/Login.vue"),
    meta: {
      layout: "full"
    }
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import("./views/Register.vue"),
    meta: {
      layout: "full"
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page-not-found',
    component: () => import("./views/404.vue"),
    meta: {
      layout: "full"
    }
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router