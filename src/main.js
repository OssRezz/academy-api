import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
// style
import "./assets/css/style.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

createApp(App).use(router).use(store).use(VueSweetalert2).mount("#app");
