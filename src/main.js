import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// import vuesax with icons
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css';

import 'vuesax/dist/vuesax.css' //Vuesax styles
Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: '#f00000',
    }
  }
})


Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
