import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Sweet Alert
import VueSweetalert2 from 'vue-sweetalert2';
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);



Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
