//basic vue components
import Vue from 'vue'
Vue.config.productionTip = false
import App from './app.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//library for fontawesome
library.add(faUserSecret)
//component for fontawesome
Vue.component('font-awesome-icon', FontAwesomeIcon)

//firebase init
import firebase from 'firebase/app'
import firebaseConfig from './firebase'

firebase.initializeApp(firebaseConfig)
// firebase
// 	.auth()
// 	.signOut()
// 	.catch(err => {}) //auto logout(for auth testing)

//vue object init
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
