import * as VueRouter from 'vue-router'
import {RouteRecordRaw} from 'vue-router'
import WordsPage from "@/pages/word/WordsPage.vue";
import PC from "@/pages/index.vue";
import ArticlesPage from "@/pages/article/ArticlesPage.vue";
import PracticeArticles from "@/pages/article/PracticeArticles.vue";
import DictDetail from "@/pages/word/DictDetail.vue";
import PracticeWords from "@/pages/word/PracticeWords.vue";
import BookDetail from "@/pages/article/BookDetail.vue";
import DictList from "@/pages/word/DictList.vue";
import BookList from "@/pages/article/BookList.vue";
import Setting from "@/pages/setting/Setting.vue";
import Home from "@/pages/home/index.vue";
// import Login from "@/pages/user/login.vue";
import User from "@/pages/user/index.vue";
import Login from '@/views/Login.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: PC,
    redirect: '/',
    children: [
      {path: '/', component: Home},
      {path: 'words', component: WordsPage},
      {path: 'word', redirect: '/words'},
      {path: 'practice-words/:id', component: PracticeWords},
      {path: 'study-word', redirect: '/words'},
      {path: 'dict-list', component: DictList},
      {path: 'dict-detail', component: DictDetail},

      {path: 'articles', component: ArticlesPage},
      {path: 'article', redirect: '/articles'},
      {path: 'practice-articles/:id', component: PracticeArticles},
      {path: 'study-article', redirect: '/articles'},
      {path: 'book-detail', component: BookDetail},
      {path: 'book-list', component: BookList},
      {path: 'setting', component: Setting},
      {path: 'user', component: User},
      {path: 'login', name: 'Login', component: Login},
    ]
  },
  {path: '/batch-edit-article', component: () => import("@/pages/article/BatchEditArticlePage.vue")},
  {path: '/test', component: () => import("@/pages/test/test.vue")},
  {path: '/:pathMatch(.*)*', redirect: '/'},
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(import.meta.env.VITE_ROUTE_BASE),
  // history: VueRouter.createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log('savedPosition', savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return {top: 0}
    }
  },
})

router.beforeEach((to, from, next) => {
 const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'
 
   if (to.path === '/' && !isAuthenticated) {
     next('/login');
   } else {
     next()
   }
})


export default router
