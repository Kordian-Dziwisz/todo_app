//basic modules
import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
//firebase
import './firebase.config'
//vendor
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faArchive,
	faCalendarAlt,
	faCog,
	faEllipsisV,
	faLayerGroup,
	faPlus,
	faStar,
	faTrashAlt,
	faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

//jquery
window.$ = require('jquery')

//library for fontawesome
library.add(
	faUser,
	faStar,
	faCalendarAlt,
	faLayerGroup,
	faArchive,
	faCog,
	faPlus,
	faEllipsisV,
	faTrashAlt
)
//component for fontawesome
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(BootstrapVue)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
