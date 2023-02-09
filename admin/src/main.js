import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import './permission.js'
import router from './router';
import pinia from './store';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/es/components/message/style/css';
import directives from '@/directives/index.js'
//iconfont
import './assets/icons/iconfont';

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(pinia).use(directives).mount('#app');
