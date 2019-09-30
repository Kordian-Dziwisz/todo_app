//basic vue components
import Vue from 'vue'
Vue.config.productionTip = false
import App from './app.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

//firebase init
import firebase from 'firebase'
require('firebase/firestore')
import firebaseConfig from './firebase'

firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
