import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import Notification from './components/Notification.vue';
import Goal from './components/Goal.vue';
import Timer from './components/Timer.vue';

const routes = [
  { path: '/goal', component: Goal },
  { path: '/notification', component: Notification },
  { path: '/timer', component: Timer },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
