//basic vue components
import Vue from 'vue'
Vue.config.productionTip = false
import App from './app.vue'
import router from './router'
import store from './store'

//firebase init
import firebase from 'firebase'
require('firebase/firestore')
import firebaseConfig from './firebase'

firebase.initializeApp(firebaseConfig)
const firestore = firebase.firestore()
firestore
	.collection('users')
	.add({
		config: { darkMode: false },
		name: 'Kordian'
	})
	.then(console.log('transaction completed'))
	.catch(console.log('transaction not completed'))

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
