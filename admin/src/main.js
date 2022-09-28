import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import './permission.js'
import router from './router';
import pinia from './store';
import 'element-plus/es/components/message/style/css';
//iconfont
import './assets/icons/iconfont';

const app = createApp(App);

app.use(router).use(pinia).mount('#app');
