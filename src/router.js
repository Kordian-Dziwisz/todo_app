import Vue from 'vue'
import Router from 'vue-router'
import Login from '@v/login'
import Register from '@v/register'
import UserPanel from '@v/user-panel.vue'

Vue.use(Router);

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
		{ path: '/login', name: 'login', component: Login },
		{ path: '/register', name: 'register', component: Register },
		{
			path: '/user-panel',
			name: 'user-panel',
			component: UserPanel
		}
	]
})
