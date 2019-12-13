<template>
	<div class="card h-75 col-10" id="margin-top">
		<div class="row">
			<div class="col-6">
				<label>
					<h4>Nazwa:</h4>
				</label>
				<p v-if="!isTaskEdited">{{task.title}}</p>
				<b-input type="text" placeholder="Wpisz nazwę zadania" v-model="editData.title" v-else />
			</div>
			<div class="col-3">
				<label>
					<h4>Status:</h4>
				</label>
				<p v-if="!isTaskEdited">{{task.isCompleted}}</p>
				<b-form-checkbox v-model="editData.isCompleted" v-else>Zakończ zadanie</b-form-checkbox>
			</div>
		</div>
		<div class="row">
			<div class="col-9">
				<label>Opis:</label>
				<p v-if="!isTaskEdited">{{task.description}}</p>
				<b-textarea
					rows="10"
					type="text"
					placeholder="Wpisz opis zadania"
					v-model="editData.description"
					v-else
				/>
			</div>
		</div>
		<b-container fluid id="my-btns-for-edit">
			<b-container
				fluid
				v-if="!isTaskEdited"
				class="my-btn-containers justify-content-between align-items-end"
			>
				<b-button @click="closeTaskDetails()">
					<font-awesome-icon :icon="['fas', 'arrow-left']" class="fa-fw" />
				</b-button>
				<b-button @click="editTask()">
					<font-awesome-icon :icon="['fas', 'edit']" class="fa-fw" />
				</b-button>
			</b-container>
			<b-container fluid v-else class="my-btn-containers justify-content-end align-items-end">
				<b-button-group>
					<b-button @click="saveTaskAgent()">
						<font-awesome-icon :icon="['fas', 'save']" class="fa-fw" />
					</b-button>
					<b-button @click="isTaskEdited = false">
						<font-awesome-icon :icon="['fas', 'times']" class="fa-fw" />
					</b-button>
				</b-button-group>
			</b-container>
		</b-container>
	</div>
</template>
<script>
import Task from '@/mixins/firestore/task'

export default {
	mixins: [Task],
	data() {
		return {
			editData: {},
			isTaskEdited: false
		}
	},
	methods: {
		editTask() {
			this.editData = { ...this.task }
			this.isTaskEdited = true
		},
		saveTaskHelper() {
			this.saveTask(this.editData)
		},
		closeTaskDetails() {
			this.$emit('closeTask')
			this.$router.push({
				name: 'user-panel',
				query: { projectID: this.projectID }
			})
		},
		saveTaskAgent() {
			this.saveTask(this.editData)
			this.isTaskEdited = false
		},
		/**
		 * emit firebase error message
		 * @param {string} err firebase error code
		 * @emits string#error output error message
		 */
		emitError(err) {
			var msg
			switch (err.code) {
				case 'permission-denied':
					msg = 'niewystarczające uprawnienia'
					break
				default:
					msg = 'wystąpił nieznany błąd'
			}
			this.$emit('error', msg)
		}
	}
}
</script>
<style scoped lang="scss">
#margin-top {
	margin-top: 25% !important;
	display: flex;
	overflow-y: scroll;

	#my-btns-for-edit {
		display: flex;
		height: 100%;
		padding: 10px;
		margin: 0;
		.my-btn-containers {
			display: flex;
		}
	}
}
</style>
