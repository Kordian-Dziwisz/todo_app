import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'
import Login from '@v/login'
import Register from '@v/register'
import UserPanel from '@v/user-panel/user-panel.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			redirect: {
				name: 'user-panel',
				query: { projectID: 'A1X83DUed6fOPqwt1iJi' }
			}
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			beforeEnter(to, from, next) {
				firebase
					.auth()
					.signOut()
					.then(next())
			}
		},
		{
			path: '/register',
			name: 'register',
			component: Register,
			beforeEnter(to, from, next) {
				firebase
					.auth()
					.signOut()
					.then(next())
			}
		},
		{
			path: '/user-panel',
			name: 'user-panel',
			component: UserPanel,
			beforeEnter(to, from, next) {
				if (firebase.auth().currentUser === null)
					next({ name: 'login' })
				else next()
			}
		}
	]
})
