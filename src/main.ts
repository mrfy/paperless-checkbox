import App from "./App.vue";
import CompositionApi from "@vue/composition-api";
import Vue from "vue";

Vue.config.productionTip = false;
Vue.use(CompositionApi);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
