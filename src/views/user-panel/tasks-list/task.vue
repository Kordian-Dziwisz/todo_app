<template>
	<div class="card">
		<div class="card-body h-auto w-auto">
			<router-link
				:to="{name: 'user-panel', query: {projectID: 'A1X83DUed6fOPqwt1iJi', taskID: task.id}}"
			>
				<h4 class="card-title">{{task.title}}</h4>
			</router-link>
			<p class="card-text">{{task.description}} : {{task.isCompleted}}</p>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		task: undefined
	}
}
</script>