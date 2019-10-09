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

//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//library for fontawesome
library.add(faUserSecret)
//component for fontawesome
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
