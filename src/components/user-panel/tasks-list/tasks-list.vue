<template>
	<div class="card h-75 col-7" id="my-tasks-list">
		<task
			v-for="(task, index) in list"
			:key="task.id"
			:task="task"
			:index="index"
			@delete="toggleDeleteModal = true"
		></task>
		<b-button @click="toggleAddModal = true" id="my-add-task-button" variant="primary">
			<font-awesome-icon :icon="['fas', 'plus']" />
		</b-button>

		<b-modal
			title="Usuwanie zadania"
			@hide="toggleDeleteModal = true"
			v-model="toggleDeleteModal"
			:lazy="true"
		>
			<p>Czy chcesz usunąć to zadanie?</p>
			<div slot="modal-footer" class="w-100">
				<b-button class="float-right ml-1" variant="outline-primary">Usuń</b-button>
				<b-button class="float-right" variant="outline-danger" @click="toggleDeleteModal = false">Anuluj</b-button>
			</div>
		</b-modal>

		<b-modal
			title="Dodaj nowe zadanie"
			@hide="toggleAddModal = false"
			v-model="toggleAddModal"
			:lazy="true"
		>
			<form @submit.prevent="addTask">
				<b-form-group>
					<label for="titleInput">Tytuł:</label>
					<b-form-input id="titleInput" type="text" v-model="newTask.title" placeholder="Tytuł zadania"></b-form-input>
				</b-form-group>
				<b-form-group>
					<label for="descriptionInput">Opis:</label>
					<b-form-input
						id="descriptionInput"
						type="text"
						v-model="newTask.description"
						placeholder="Opis zadania"
					></b-form-input>
				</b-form-group>
			</form>
			<div slot="modal-footer" class="w-100">
				<b-button class="float-right ml-1" variant="outline-primary" @click="addTask">Dodaj zadanie</b-button>
				<b-button class="float-right" variant="outline-danger" @click="toggleAddModal = false">Anuluj</b-button>
			</div>
		</b-modal>
	</div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import Task from './task'
import { isNumber } from 'util'

export default {
	components: { Task },
	data() {
		return {
			list: [],
			deleteIndex: Number,
			newTask: {
				title: '',
				description: ''
			},
			toggleAddModal: false,
			toggleDeleteModal: false
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
			this.tasks.get().then(collection => {
				this.list = collection.docs.map(this.mapList)
			})
		},
		mapList(task) {
			return { ...task.data(), id: task.id }
		},
		addTask() {
			if (this.newTask.title.length) {
				firebase
					.firestore()
					.collection('projects')
					.doc('A1X83DUed6fOPqwt1iJi')
					.collection('tasks')
					.add({ ...this.newTask, isCompleted: false })
					.then(this.addTaskToList)
					.catch(console.log),
					(this.toggleAddModal = false)
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
		}
		// toggleAddModal() {
		// 	$('#addModal').modal('toggle')
		// },
		// toggleDeleteModal(index) {
		// 	if (isNumber(index)) this.deleteIndex = index
		// 	$('#deleteModal').modal('toggle')
		// }
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
