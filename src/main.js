import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
// style
import "./assets/css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/js/bootstrap.min.js'

createApp(App).use(router).use(store).mount("#app");
