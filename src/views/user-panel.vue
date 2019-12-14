<template>
	<b-row class="vh-100">
		<side-bar @openProject="openProject" @openFilter="openFilter"></side-bar>
		<b-col class="d-flex flex-row justify-content-around vh-100" lg="10" md="10" sm="10">
			<error-alert v-if="error.length" :error="error" :key="error"></error-alert>
			<task-details
				v-if="taskID"
				v-show="isTaskVisible"
				:projectID="projectID"
				:taskID="taskID"
				:key="taskID"
				@closeTask="closeTask"
				@error="showError"
			></task-details>
			<tasks-list
				v-else-if="projectID"
				v-show="!isTaskVisible"
				:projectID="projectID"
				@openTask="openTask"
				@error="showError"
				:key="projectID"
			></tasks-list>
			<p v-else>Nie wybrano żadnego projektu! Wybierz go z menu po lewej stronie lub stwórz nowy!</p>
		</b-col>
	</b-row>
</template>

<script>
import SideBar from '@c/side-bar'
import TasksList from '@c/user-panel/task-list/task-list'
import TaskDetails from '@c/user-panel/task-details/task-details'
import ErrorAlert from '@c/user-panel/error-alert.vue'
export default {
	components: {
		SideBar,
		TasksList,
		TaskDetails,
		ErrorAlert
	},
	data() {
		return {
			taskID: '',
			projectID: '',
			isTaskVisible: false,
			error: ''
		}
	},
	created() {
		this.projectID = this.$route.query.projectID
		this.taskID = this.$route.query.taskID
		if (this.taskID !== undefined) {
			this.isTaskVisible = true
		}
	},
	methods: {
		openTask(taskID) {
			this.isTaskVisible = true
			this.taskID = taskID
		},
		openProject(projectID) {
			this.taskID = undefined
			this.isTaskVisible = false
			this.projectID = projectID
		},
		closeTask() {
			this.isTaskVisible = false
			this.taskID = undefined
		},
		openFilter() {
			this.isTaskVisible = false
			this.projectID = undefined
			this.taskID = undefined
		},
		/**
		 * @param {string} err error message
		 */
		showError(err) {
			this.error = err
		}
	}
}
</script>
<style lang="scss" scoped>
body {
	margin: 0 !important;
	padding: 0 !important;
}
</style>
