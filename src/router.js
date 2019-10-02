import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login'
import Register from './views/register'
import UserPanel from './views/user-panel'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{ path: '/login', component: Login },
		{ path: '/register', component: Register },
		{ path: '/user-panel', component: UserPanel }
	]
})
