<template>
	<div class="card h-75 col-7" id="my-tasks-list">
		<task
			v-for="(task, index) in list"
			:key="task.id"
			:task="task"
			:index="index"
			@delete="toggleDeleteModal"
		></task>
		<div class="modal fade" id="addModal" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Modal title</h5>
						<button type="button" class="close" @click="toggleAddModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form @submit.prevent="addTask">
							<input type="text" class="form-control" v-model="newTask.title" placeholder="title" />
							<label>
								<small>Title</small>
							</label>
							<input
								type="text"
								class="form-control"
								v-model="newTask.description"
								placeholder="description"
							/>
							<label>
								<small>Description</small>
							</label>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-outline-danger" @click="toggleAddModal">Close</button>
						<button type="button" class="btn btn-primary" @click="addTask">Add Task</button>
					</div>
				</div>
			</div>
		</div>

		<div class="modal fade" id="deleteModal" tabindex="-1">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Modal title</h5>
						<button type="button" class="close" @click="toggleDeleteModal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<p>Do you really want to delete?</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-outline-danger" @click="toggleDeleteModal">Close</button>
						<button @click="deleteTask" class="btn" type="button">Delete Task</button>
					</div>
				</div>
			</div>
		</div>
		<button @click="toggleAddModal" class="btn btn-primary -align-left" id="my-add-task-button" type="button"><font-awesome-icon :icon="['fas', 'plus']" /></button>
	</div>
</template>
<script>
	import firebase from 'firebase/app'
	import 'firebase/firestore'
	import 'firebase/auth'
	import Task from './task'
	import {isNumber} from 'util'

	export default {
	components: { Task },
	data() {
		return {
			list: [],
			deleteIndex: Number,
			newTask: {
				title: '',
				description: ''
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
					.catch(console.log)
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
			$('#addModal').modal('toggle')
		},
		toggleDeleteModal(index) {
			if (isNumber(index)) this.deleteIndex = index
			$('#deleteModal').modal('toggle')
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
