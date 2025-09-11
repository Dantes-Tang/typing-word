import * as VueRouter from 'vue-router'
import Practice from "@/pages/practice/index.vue";
import Dict from '@/pages/dict/index.vue'
import Mobile from '@/pages/mobile/index.vue'
import Test from "@/pages/test.vue";
import Login from '@/views/Login.vue'

const routes: any[] = [
    {path: '/practice', component: Practice, meta: { requiresAuth: true }},
    {path: '/dict', component: Dict, meta: { requiresAuth: true }},
    {path: '/mobile', component: Mobile, meta: { requiresAuth: true }},
    {path: '/test', component: Test},
    {path: '/', redirect: '/practice'},
    {path: '/login', name: 'Login', component: Login},
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})
// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
