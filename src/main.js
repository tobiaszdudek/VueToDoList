import Vue from 'vue';
import EventBus from './components/event-bus.js'
import App from './App'
import "./css/main.css";



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})

