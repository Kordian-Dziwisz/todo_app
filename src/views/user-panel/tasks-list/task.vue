<template>
	<div>
		{{task.id}}
		{{task.title}}
		{{task.content}}
		{{task.isCompleted}}
		<br />
	</div>
</template>
<script>
export default {
	props: {
		task: undefined
	}
}
</script>