//basic modules
import Vue from 'vue'
Vue.config.productionTip = false
import App from './app.vue'
import router from './router'
import store from './store'

//firebase
import './firebase.config'

//jquery
window.$ = require('jquery')

//vendor
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faPlus,
	faStar,
	faCog,
	faCalendarAlt,
	faLayerGroup,
	faArchive,
	faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//library for fontawesome
library.add(faUser, faStar, faCalendarAlt, faLayerGroup, faArchive, faCog, faPlus)
//component for fontawesome
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
