//basic vue components
import Vue from 'vue'
Vue.config.productionTip = false
import App from './app.vue'
import router from './router'
import store from './store'
import boostrap from 'bootstrap'

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
