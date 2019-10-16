<template>
	<div>
		<side-bar></side-bar>
		<tasks-list></tasks-list>
	</div>
</template>

<script>
import SideBar from '@c/side-bar'
import TasksList from './tasks-list'
export default {
	components: {
		SideBar,
		TasksList
	}
}
</script>