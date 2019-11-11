<template>
	<b-row class="vh-100">
		<side-bar></side-bar>
		<b-col class="d-flex flex-row justify-content-around vh-100" lg="10" md="10" sm="10">
			<tasks-list v-show="!isTaskVisible" @openTask="openTask"></tasks-list>
			<task-details v-if="isTaskVisible" :taskID="taskID" :key="taskID"></task-details>
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
			isTaskVisible: false
		}
	},
	methods: {
		openTask(taskID) {
			this.taskID = taskID
			this.isTaskVisible = true
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
