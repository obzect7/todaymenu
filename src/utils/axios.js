import axios from 'axios';
import { Toast } from 'vant';
import storage from './storage';
import router from '../router';

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers['token'] = localStorage.getItem('token') || '';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.response.use((res) => {
  if (typeof res.data !== 'object') {
    Toast.fail('서버 측 예외！');
    return Promise.reject(res);
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) Toast.fail(res.data.message);
    if (res.data.resultCode == 416) {
      router.push({ path: '/login' });
    }
    if (res.data.data && window.location.hash == '#/login') {
      storage.set('token', res.data.data);
      axios.defaults.headers['token'] = res.data.data;
    }
    return Promise.reject(res.data);
  }

  return res.data;
});

export default axios;
