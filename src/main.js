//basic vue components
import Vue from 'vue'
Vue.config.productionTip = false
import App from './app.vue'
import router from './router'
import store from './store'
//module imports
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './firebase.config'

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
