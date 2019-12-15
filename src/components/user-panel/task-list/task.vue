<template>
	<b-container>
		<div class="h-auto w-auto" id="my-task">
			<div class="my-task-title">
				<a @click="open">
					<h4>{{task.title}}</h4>
				</a>
				<!--				<font-awesome-icon class="fa-fw my-ellipsis-v" :icon="['fas', 'ellipsis-v']"/>-->
			</div>
			<h6 class="disabled">Opis:</h6>
			<p class>{{task.description}}</p>
			<div class="my-div-to-left">
				<b-btn @click="deleteTask" class="btn-sm" id="my-delete-task-btn" variant="danger">
					<font-awesome-icon :icon="['fas', 'trash-alt']" />
				</b-btn>
			</div>
		</div>
		<hr/>
	</b-container>
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
	@import "~bootstrap/scss/bootstrap";

.container {
	hr {
		width: 100%;
		border: 1px solid $gray-100;
		border-radius: 7px;
	}
	#my-task {
		padding: 10px;
		border: none;

		.my-task-title {
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
				color: $gray-100;
				cursor: pointer;
				transition: color .3s;

			}
			a:hover {
				text-decoration: none;
				color: $gray-500;

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
