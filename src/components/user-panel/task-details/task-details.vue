<template>
	<div class="card h-75 col-7" id="margin-top">
		<div class="row">
			<div class="col-6">
				<label>Nazwa:</label>
				<p>{{taskData.title}}</p>
			</div>
			<div class="col-6">
				<label>Status:</label>
				<p>{{taskData.isCompleted}}</p>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<label>Opis:</label>
				<p>{{taskData.description}}</p>
			</div>
		</div>
		<!-- <subtasks-list></subtasks-list> -->
	</div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import SubtasksList from './subtasks-list'
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
<style scoped>
#margin-top {
	margin-top: 50px;
	display: flex;
	overflow-y: scroll;
}
</style>