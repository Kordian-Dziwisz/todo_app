<template>
	<div></div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import SubtasksList from './subtask-list/subtask-list'
export default {
	components: { SubtasksList },
	props: {
		taskID: String
	},
	data() {
		return {
			taskData: {},
			editTaskData: {},
			task: undefined,
			isTaskEdited: false
		}
	},
	created() {
		this.task = firebase
			.firestore()
			.collection('projects')
			.doc('A1X83DUed6fOPqwt1iJi')
			.collection('tasks')
			.doc(this.taskID)

		this.getTaskData()
	},
	methods: {
		getTaskData() {
			const self = this
			this.task.get().then(task => {
				self.taskData = task.data()
			})
		},
		editTask() {
			this.editTaskData = { ...this.taskData }
			this.isTaskEdited = true
		},
		saveTask() {
			if (this.editTaskData.title.length) {
				this.taskData = this.editTaskData
				this.task.update(this.taskData)
				this.isTaskEdited = false
			}
		},
		completeTask() {
			this.task.update({ completed: true })
		},
		uncompleteTask() {
			this.task.update({ completed: false })
		}
	}
}
</script>