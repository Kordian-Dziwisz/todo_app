<template>
	<div>
		<side-bar></side-bar>
	</div>
</template>

<script>
import SideBar from '@c/side-bar'
import TasksList from './tasks-list/tasks-list'
import TaskInfo from './task-info/task-info'
export default {
	components: {
		SideBar,
		TasksList,
		TaskInfo
	}
}
</script>