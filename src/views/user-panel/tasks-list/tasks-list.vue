<template>
	<div></div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
	data() {
		return {
			list: []
		}
	},
	created() {
		this.tasks = firebase
			.firestore()
			.collection('projects')
			.doc('A1X83DUed6fOPqwt1iJi')
			.collection('tasks')

		this.getList()
	},
	methods: {
		getList() {
			const self = this
			this.tasks
				.get()
				.then(function(collection) {
					self.list = collection.docs.map(task => {
						return task.data()
					})
				})
				.catch(console.log)
		},
		createTask(taskData) {
			if (taskData.title.length()) {
				this.tasks.add(taskData).catch(console.log)
			}
		},
		deleteTask(taskID) {
			this.deleteSubtasks(taskID)
			this.tasks
				.doc(taskID)
				.delete()
				.catch(console.log)
		},
		deleteSubtasks(taskID) {
			this.tasks
				.doc(taskID)
				.collection('subtasks')
				.get()
				.then(collection => {
					collection.docs.forEach(subtask => {
						subtask.ref.delete().catch(console.log)
					})
				})
				.catch(console.log)
		}
	}
}
</script>