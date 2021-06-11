import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueToastify from "vue-toastify";

Vue.use(VueToastify);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
