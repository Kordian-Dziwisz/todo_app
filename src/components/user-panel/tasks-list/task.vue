<template>
	<div class="container">
		<div class="h-auto w-auto" id="my-task">
			<div class="my-task-title">
				<a
					@click="open"
					:to="{name: 'user-panel', query: {projectID: 'A1X83DUed6fOPqwt1iJi', taskID: task.id}}"
				>
					<h4>{{task.title}}</h4>
				</a>
				<!--				<font-awesome-icon class="fa-fw my-ellipsis-v" :icon="['fas', 'ellipsis-v']"/>-->
			</div>
			<h6 class="disabled">Opis</h6>
			<p class>{{task.description}} : {{task.isCompleted}}</p>
			<div class="my-div-to-left">
				<button @click="deleteTask" class="btn btn-sm btn-danger" id="my-delete-task-btn">
					<font-awesome-icon :icon="['fas', 'trash-alt']" />
				</button>
			</div>
		</div>
		<hr />
	</div>
</template>
<script>
export default {
	props: {
		task: Object,
		index: Number
	},
	methods: {
		deleteTask() {
			this.$emit('delete', this.index)
		},
		open() {
			this.$emit('open', this.task.id)
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	#my-task {
		padding: 10px;
		border: none;

		.my-task-title {
			color: #7c7c7d;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.my-ellipsis-v {
				cursor: pointer;
			}
			.my-ellipsis-v:hover {
				color: #6b6b6c;
			}
			a {
				color: #7c7c7d;
			}
			a:hover {
				text-decoration: none;
				color: #6b6b6c;
			}
		}
		#my-delete-task-btn {
			border-radius: 50%;
		}
		.my-div-to-left {
			text-align: right;
		}
	}
}
</style>
