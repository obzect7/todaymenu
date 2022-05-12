import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import 'vant/lib/index.css';
import KakaoSdk from "vue-kakao-sdk"

createApp(App)
    .use(Vant)
    .use(store)
    .use(router)
    .use(KakaoSdk, { apiKey : "6528dbc229faea9bbd97529ef1be8b9a"})
    .mount('#app');
