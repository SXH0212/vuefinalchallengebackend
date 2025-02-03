import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { currency } from '@/methods/filters';
import httpMessageState from '@/methods/pushMessageState';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.config.globalProperties.$filters = {
  currency,
};
app.provide('httpMessageState', httpMessageState);//  前面是名稱，後面是 import 進來的 method
app.use(VueAxios, axios);
app.use(router);
app.component('Loading', Loading);
app.mount('#app');
