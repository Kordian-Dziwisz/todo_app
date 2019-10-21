<template>
	<div>
		{{task.id}}
		{{task.title}}
		{{task.content}}
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