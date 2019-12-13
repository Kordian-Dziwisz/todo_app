<template>
	<div class="card h-100 w-100 m-0 col-10" id="my-tasks-list">
		<template v-if="tasks.length">
			<task
				v-for="(task, index) in tasks"
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
		<delete-modal
			v-if="isDeleteModalVisible"
			:key="isDeleteModalVisible"
			:modalType="'task'"
			@deleteTask="deleteTaskAgent"
			@closeModal="toggleDeleteModal"
		></delete-modal>

		<b-modal title="Dodaj nowe zadanie" v-model="isAddModalVisible" :lazy="true">
			<b-form @submit.prevent="addTaskAgent">
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
				<b-button
					type="submit"
					class="float-right ml-1"
					variant="outline-primary"
					@click="addTaskAgent"
				>Dodaj zadanie</b-button>
				<b-button class="float-right" variant="outline-danger" @click="toggleAddModal">Anuluj</b-button>
			</div>
		</b-modal>
	</div>
</template>
<script>
import Task from './task'
import { isNumber } from 'util'
import Tasks from '@/mixins/firestore/tasks'
import deleteModal from '@c/delete-modal.vue'

export default {
	components: {
		Task,
		deleteModal
	},
	mixins: [Tasks],
	props: {
		projectID: String
	},
	data() {
		return {
			deleteIndex: null,
			newTask: {},
			isAddModalVisible: false,
			isDeleteModalVisible: false
		}
	},
	methods: {
		toggleAddModal() {
			this.isAddModalVisible = !this.isAddModalVisible
		},
		toggleDeleteModal(index) {
			if (Number.isInteger(index)) this.deleteIndex = index
			this.isDeleteModalVisible = !this.isDeleteModalVisible
		},
		/**
		 * only for activating addTask with newTask param
		 */
		addTaskAgent() {
			this.addTask(this.newTask)
			this.toggleAddModal()
		},
		deleteTaskAgent() {
			this.deleteTask(this.deleteIndex)
			this.toggleDeleteModal()
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
