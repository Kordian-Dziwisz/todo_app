<template>
	<div class="card h-75 col-10" id="margin-top">
		<div class="row">
			<div class="col-6">
				<label><h4>Nazwa:</h4></label>
				<p v-if="!isTaskEdited">{{taskData.title}}</p>
				<b-input type="text" placeholder="Wpisz nazwę zadania" v-model="editTaskData.title" v-else />
			</div>
			<div class="col-3">
				<label><h4>Status:</h4></label>
				<p v-if="!isTaskEdited">{{taskData.isCompleted}}</p>
				<b-form-checkbox v-model="editTaskData.isCompleted" v-else>Zakończ zadanie</b-form-checkbox>
			</div>
		</div>
		<div class="row">
			<div class="col-9">
				<label>Opis:</label>
				<p v-if="!isTaskEdited">{{taskData.description}}</p>
				<b-textarea rows="10" type="text" placeholder="Wpisz opis zadania" v-model="editTaskData.description" v-else />
			</div>
		</div>
		<div id="my-btns-for-edit">
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
</template>
<script>
	import firebase from 'firebase/app'
	import 'firebase/firestore'
	import SubtasksList from './subtasks-list'

	export default {
	components: { SubtasksList },
	props: {
		projectID: String,
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
			.doc(this.projectID)
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
			this.$router.push({
				name: 'user-panel',
				query: { projectID: this.projectID }
			})
		}
	}
}
</script>
<style scoped lang="scss">
#margin-top {
	mergin-top: 25% !important;
	display: flex;
	overflow-y: scroll;

	#my-btns-for-edit {
		display: flex;
		align-content: left;
		justify-content: flex-end;
		position: fixed;
		top: 70vh;
		left: 79%;
	}
}
</style>
