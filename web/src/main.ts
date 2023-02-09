import { createApp } from 'vue';
import './styles/common.scss';
import './styles/index.scss';
import 'element-plus/dist/index.css';
import App from './App.vue';
import router from './router';
import pinia from './stores/index';
import directives from './utils/directives';
import '@/styles/article.scss';
// custom element dark(自定义暗黑模式)
import "@/styles/dark.scss";

const app = createApp(App);

app.use(router).use(pinia).use(directives).mount('#app');
