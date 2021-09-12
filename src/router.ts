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
    name: 'blogs-list',
    component: () => import("./views/blogs/List.vue")
  },
  {
    path: '/blogs/add',
    name: 'add-blog',
    component: () => import("./views/blogs/Add.vue")
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
    path: '/blogs/:blogId',
    name: 'blog-details',
    component: () => import("./views/BlogDetails.vue")
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