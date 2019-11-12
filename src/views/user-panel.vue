<template>
	<b-row class="vh-100">
		<side-bar @openProject="openProject"></side-bar>
		<b-col class="d-flex flex-row justify-content-around vh-100" lg="10" md="10" sm="10">
			<task-details
				v-if="taskID"
				v-show="isTaskVisible"
				:projectID="projectID"
				:taskID="taskID"
				:key="taskID"
				@closeTask="closeTask"
			></task-details>
			<tasks-list
				v-else-if="projectID"
				v-show="!isTaskVisible"
				:projectID="projectID"
				@openTask="openTask"
				:key="projectID"
			></tasks-list>
			<p v-else>Nie wybrano żadnego projektu! Wybierz go z menu po lewej stronie lub stwórz nowy!</p>
		</b-col>
	</b-row>
</template>

<script>
import SideBar from '@c/side-bar'
import TasksList from '@c/user-panel/tasks-list/tasks-list'
import TaskDetails from '@c/user-panel/task-details/task-details'
export default {
	components: {
		SideBar,
		TasksList,
		TaskDetails
	},
	data() {
		return {
			taskID: '',
			projectID: '',
			isTaskVisible: false
		}
	},
	created() {
		this.projectID = this.$route.query.projectID
		this.taskID = this.$route.query.taskID
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
