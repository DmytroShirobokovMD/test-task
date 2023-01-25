import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import CountryFlag from 'vue-country-flag'
import { VueMaskDirective } from 'v-mask'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.component('country-flag', CountryFlag)
Vue.directive('mask', VueMaskDirective);
Vue.use(Toast);

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
