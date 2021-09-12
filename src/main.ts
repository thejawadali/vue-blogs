import { createApp } from 'vue'
import App from './App.vue'
import "./style.css"
import router from "./router";
import { createPinia } from "pinia"
import BaseInupt from "./components/Base/BaseInupt.vue";
import Divider from "./components/Base/Divider.vue";
import ProfilePic from "./components/Base/ProfilePic.vue";

const app = createApp(App)
app.use(createPinia())
app.component('base-input', BaseInupt)
app.component('divider', Divider)
app.component('profile-pic', ProfilePic)
app.use(router)
app.mount('#app')
