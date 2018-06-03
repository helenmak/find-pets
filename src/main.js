// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import eventBus from './plugins/eventBus'
import store from './store'


Vue.config.productionTip = false

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    eventBus
  },
  router,
  store,
  components: { App },
  template: '<App/>'
})
