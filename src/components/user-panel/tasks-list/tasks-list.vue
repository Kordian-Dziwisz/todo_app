<template>
	<div class="card h-100 w-100 m-0 col-10" id="my-tasks-list">
		<template v-if="list.length">
			<task
				v-for="(task, index) in list"
				:key="task.id"
				:task="task"
				:index="index"
				@delete="toggleDeleteModal"
				@open="openTask"
			></task>
		</template>
		<p v-else>Nie masz jeszcze żadnego zadania! Dodaj je.</p>
		<b-button @click="toggleAddModal" id="my-add-task-button" variant="primary">
			<font-awesome-icon :icon="['fas', 'plus']" />
		</b-button>

		<b-modal title="Usuwanie zadania" v-model="isDeleteModalVisible" :lazy="true">
			<p>Czy na pewno chcesz usunąć to zadanie?</p>
			<div slot="modal-footer" class="w-100">
				<b-button class="float-right ml-1" variant="outline-primary" @click="deleteTask">Usuń</b-button>
				<b-button
					class="float-right"
					variant="outline-danger"
					@click="isDeleteModalVisible = false"
				>Anuluj</b-button>
			</div>
		</b-modal>

		<b-modal title="Dodaj nowe zadanie" v-model="isAddModalVisible" :lazy="true">
			<b-form @submit.prevent="addTask">
				<b-form-group>
					<label for="titleInput">Tytuł:</label>
					<b-form-input id="titleInput" type="text" v-model="newTask.title" placeholder="Tytuł zadania"></b-form-input>
				</b-form-group>
				<b-form-group>
					<label for="descriptionInput">Opis:</label>
					<b-form-textarea
						id="descriptionInput"
						type="text"
						v-model="newTask.description"
						placeholder="Opis zadania"
					></b-form-textarea>
				</b-form-group>
			</b-form>
			<div slot="modal-footer" class="w-100">
				<b-button class="float-right ml-1" variant="outline-primary" @click="addTask">Dodaj zadanie</b-button>
				<b-button class="float-right" variant="outline-danger" @click="toggleAddModal">Anuluj</b-button>
			</div>
		</b-modal>
	</div>
</template>
<script>
	import firebase from 'firebase/app'
	import 'firebase/firestore'
	import Task from './task'
	import {isNumber} from 'util'

	export default {
	components: { Task },
	props: {
		projectID: String
	},
	data() {
		return {
			list: [],
			deleteIndex: Number,
			newTask: {
				title: '',
				description: ''
			},
			isAddModalVisible: false,
			isDeleteModalVisible: false,
			tasks: undefined
		}
	},
	created() {
		this.tasks = firebase
			.firestore()
			.collection('projects')
			.doc(this.projectID)
			.collection('tasks')
		this.getList()
	},
	methods: {
		getList() {
			this.tasks.get().then(collection => {
				this.list = collection.docs.map(this.mapList)
			})
		},
		mapList(task) {
			return { ...task.data(), id: task.id }
		},
		addTask() {
			if (this.newTask.title.length) {
				this.tasks
					.add({ ...this.newTask, isCompleted: false })
					.then(this.addTaskToList)
					.catch(console.log),
					this.toggleAddModal()
			}
		},
		addTaskToList(task) {
			this.list.push({ ...this.newTask, id: task.id, isCompleted: false })
		},
		deleteTask() {
			this.tasks
				.doc(this.list[this.deleteIndex].id)
				.delete()
				.catch(console.log())
			this.deleteTaskInLIst()
			this.toggleDeleteModal()
		},
		deleteTaskInLIst() {
			this.list.splice(this.deleteIndex, 1)
		},
		toggleAddModal() {
			this.isAddModalVisible = !this.isAddModalVisible
		},
		toggleDeleteModal(index) {
			if (isNumber(index)) this.deleteIndex = index
			this.isDeleteModalVisible = !this.isDeleteModalVisible
		},
		openTask(taskID) {
			this.$emit('openTask', taskID)
			this.$router.push({
				name: 'user-panel',
				query: { projectID: this.projectID, taskID: taskID }
			})
		}
	}
}
</script>
<style lang="scss" scoped>
#my-tasks-list {
	margin-top: 50px;
	display: flex;
	overflow-y: scroll;
}
#my-add-task-button {
	width: 50px;
	height: 50px;
	border-radius: 50%;
	position: fixed;
	top: 92vh;
	left: 94vw;
	border: none;
}
</style>
