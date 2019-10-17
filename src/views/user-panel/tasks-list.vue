<template>
	<div></div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
	data() {
		return {
			list: [],
			task: {
				title: '',
				content: ''
			}
		}
	},
	created() {
		this.getList()
	},
	methods: {
		getList() {
			firebase
				.firestore()
				.collection('projects')
				.doc('A1X83DUed6fOPqwt1iJi')
				.collection('tasks')
				.get()
				.then(collection => {
					this.list = collection.docs.map(this.mapList)
				})
		},
		mapList(task) {
			return task.data()
		},
		addTask() {
			firebase
				.firestore()
				.collection('projects')
				.doc('A1X83DUed6fOPqwt1iJi')
				.collection('tasks')
				.add(this.task)
				.catch(console.log)
		},
		deleteTask(taskID) {
			firebase
				.firestore()
				.collection('projects')
				.doc('A1X83DUed6fOPqwt1iJi')
				.collection('tasks')
				.doc(taskID)
				.delete()
				.then(console.log)
		}
	}
}
</script>