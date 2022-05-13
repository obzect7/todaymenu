import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
// import Login from '../views/Login';
import store from '@/store';
import storage from '@/utils/storage';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Home,
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
      requireAuth: true // 이 필드가 있는 경우 이 라우팅 페이지에 로그인 권한이 필요함.
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
  {
    path: '/MyOhme',
    name: 'MyOhme',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/MyOhme.vue'),
    meta: {
      index: 1,
    },
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/SignUp.vue'),
    meta: {
      index: 2,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/* to : 이동할 url
from : 현재 url
next : to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
전역 라우팅 가드(java의 interceptor 와 동일한 기능을 함
url 참조 https://joshua1988.github.io/web-development/vuejs/vue-router-navigation-guards/ */
router.beforeEach((to, from, next) => {
  console.log('routing guard 작동중')
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  // Vuex의 상태가 라우팅 점프 과정에서 손실될 경우를 대비하여 다시 점프하기 전에 저장하십시오.
  store.commit('SET_TOKEN', storage.get('Authorization'));
  if (to.meta.requireAuth) {
    // 로컬 캐시에서 직접 판단하지 않고 Vuex의 속성 상태로 판단
    if (store.state.user.token) {
      next();
    } else {
      next({
        path: '/userLogin',
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router;
