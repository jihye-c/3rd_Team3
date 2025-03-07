import './assets/main.css';

import {createApp} from 'vue';
import {createPinia} from 'pinia';
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import {vuetify} from './plugins/vuetify';
import { setupCalendar } from 'v-calendar';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(vuetify);
app.use(createPinia());
app.use(router);
app.use(setupCalendar, {})
app.mount('#app');
