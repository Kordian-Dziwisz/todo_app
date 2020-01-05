import Vue from 'vue'
import Router from 'vue-router'
import Login from '@v/login.vue'
import Register from '@v/register.vue'
import UserPanel from '@v/user-panel.vue'
import Sandbox from '@v/sandbox.vue'

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
		{ path: '/sandbox', name: 'sandbox', component: Sandbox },
		{ path: '/login', name: 'login', component: Login },
		{ path: '/register', name: 'register', component: Register },
		{
			path: '/user-panel',
			name: 'user-panel',
			component: UserPanel,
			beforeEnter(to, from, next) {
				const auth = require('firebase/app').auth()
				auth.onAuthStateChanged(function(user: any) {
					if (user === null) {
						next({ name: 'login' })
					} else {
						next()
					}
				})
			}
		}
	]
})
