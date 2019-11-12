<template>
	<div class="card h-75 col-7" id="margin-top">
		<div class="row">
			<div class="col-6">
				<label>Nazwa:</label>
				<p v-if="!isTaskEdited">{{taskData.title}}</p>
				<b-input type="text" placeholder="Wpisz nazwę zadania" v-model="taskData.title" v-else />
			</div>
			<div class="col-3">
				<label>Status:</label>
				<p v-if="!isTaskEdited">{{taskData.isCompleted}}</p>
				<b-form-checkbox v-model="taskData.isCompleted" v-else>Zakończ zadanie</b-form-checkbox>
			</div>
			<div class="col-3">
				<b-button-group v-if="!isTaskEdited">
					<b-button @click="editTask()">Edytuj</b-button>
					<b-button @click="closeTaskDetails()">Powrót</b-button>
				</b-button-group>
				<b-button-group v-else>
					<b-button @click="saveTask()">Zapisz</b-button>
					<b-button @click="isTaskEdited = false">Anuluj</b-button>
				</b-button-group>
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<label>Opis:</label>
				<p v-if="!isTaskEdited">{{taskData.description}}</p>
				<b-input type="text" placeholder="Wpisz opis zadania" v-model="taskData.description" v-else />
			</div>
		</div>
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
			isTaskEdited: false,
			isEditing: false
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
		},
		closeTaskDetails() {
			this.$emit('closeTask')
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