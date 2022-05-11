import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login';
import store from '@/store';
import storage from '@/utils/storage';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/userLogin',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: {
      index: 1,
    },
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: () => import(/* webpackChunkName: "Favorite" */ '@/views/Favorite.vue'),
    meta: {
      index: 1,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
    meta: {
      index: 1,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const title = to.meta && to.meta.title;
//   if (title) {
//     document.title = title;
//   }
//   // 以防在路由跳转过程中,Vuex中的状态会丢失,所以再跳转前进行保存
//   store.commit('SET_TOKEN', storage.get('Authorization'));
//   if (to.meta.requireAuth) {
//     // 不直接通过本地缓存进行判断,而是通过Vuex的属性状态进行判断
//     if (store.state.user.token) {
//       next();
//     } else {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath },
//       });
//     }
//   } else {
//     next();
//   }
// });

export default router;
