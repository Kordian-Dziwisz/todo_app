<template>
	<div class="vh-100 row">
		<side-bar></side-bar>
		<div class="col-10 d-flex flex-row justify-content-around vh-100">
			<tasks-list v-show="!isTaskVisible" @openTask="openTask"></tasks-list>
			<task-details v-if="isTaskVisible" :taskID="taskID" :key="taskID"></task-details>
		</div>
	</div>
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
			console.log('openTask')
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
