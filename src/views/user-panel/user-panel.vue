<template>
	<div class="h-100 row">
		<side-bar></side-bar>
		<div class="col-10 d-flex flex-row justify-content-around align-items-center">
			<tasks-list></tasks-list>
		</div>
	</div>
</template>

<script>
import SideBar from '@c/side-bar'
import TasksList from './tasks-list/tasks-list'

export default {
	components: {
		SideBar,
		TasksList
	}
}
</script>
<style lang="scss" scoped>
body {
	margin: 0 !important;
	padding: 0 !important;
}
</style>