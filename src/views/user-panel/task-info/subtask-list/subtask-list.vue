<template>
	<div></div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
	props: {
		taskID: String
	},
	data() {
		return {
			subtasksList: []
		}
	},
	created() {
		this.subtasks = firebase
			.firestore()
			.collection('projects')
			.doc('A1X83DUed6fOPqwt1iJi')
			.collection('tasks')
			.doc(this.taskID)
			.collection('subtasks')
		this.getList()
	},
	methods: {
		getList() {
			const self = this
			this.subtasks
				.get()
				.then(function(collection) {
					self.list = collection.docs.map(subtask => {
						return subtask.data()
					})
				})
				.catch(console.log)
		},
		createSubtask(subtaskData) {
			if (subtaskData) {
				this.subtasks.add(subtaskData).catch(console.log)
			}
		},
		deleteSubtask(subtaskID) {
			this.subtasks
				.doc(subtaskID)
				.delete()
				.catch(console.log)
		}
	}
}
</script>