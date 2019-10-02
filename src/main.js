//basic vue components
import Vue from 'vue'
Vue.config.productionTip = false
import App from './app.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

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
