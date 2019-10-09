import firebase from 'firebase/app'

const config = {
	apiKey: 'AIzaSyCsX4NA_PVBWIMH080BTkDoSeXuwr-sqg8',
	authDomain: 'todo-7417a.firebaseapp.com',
	databaseURL: 'https://todo-7417a.firebaseio.com',
	projectId: 'todo-7417a',
	storageBucket: 'todo-7417a.appspot.com',
	messagingSenderId: '118109805760',
	appId: '1:118109805760:web:e97910f94c4593b6812125'
}

firebase.initializeApp(config)

class firebaseTask {
	constructor(creator, title, content, meta) {
		try {
			if (typeof title != 'string' || typeof creator != 'string') {
				throw new Error(
					"firebaseTask.prototype.constructor: title or creator aren't strings"
				)
			}
			this.title = title
			this.creator = creator
			this.content = content ? content : ''
			this.meta = meta ? meta : {}
			this.completed = false
		} catch (e) {
			console.log(e)
		}
	}
}

export default config
