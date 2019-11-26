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

export default config
