import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Font Awesomeのアイコンをライブラリに追加
library.add(faHeart, faTrash);

// Vueアプリケーションを作成し、Font Awesomeコンポーネントを登録
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
