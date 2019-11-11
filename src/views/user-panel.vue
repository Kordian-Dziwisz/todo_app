<template>
	<b-row class="vh-100">
		<side-bar></side-bar>
		<b-col class="d-flex flex-row justify-content-around vh-100" lg="10" md="10" sm="10">
			<tasks-list></tasks-list>
		</b-col>
	</b-row>
</template>

<script>
    import SideBar from '@c/side-bar'
    import TasksList from '@c/user-panel/tasks-list/tasks-list'

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
