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
		this.tasks = firebase
			.firestore()
			.collection('projects')
			.doc('A1X83DUed6fOPqwt1iJi')
			.collection('tasks')

		this.getList()
	},
	methods: {
		getList() {
			this.tasks
				.get()
				.then(collection => {
					this.list = collection.docs.map(this.mapList)
				})
				.catch(console.log)
		},
		mapList(task) {
			return task.data()
		},
		createTask() {
			this.tasks.add(this.task).catch(console.log)
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