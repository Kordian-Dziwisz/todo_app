<template>
	<div class="card h-50 col-5">
		<task v-for="task in list" :key="task.id" :task="task"></task>
	</div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import Task from './task'
export default {
	components: { Task },
	data() {
		return {
			list: []
		}
	},
	created() {
		this.getList()
	},
	methods: {
		getList() {
			firebase
				.firestore()
				.collection('projects')
				.doc('A1X83DUed6fOPqwt1iJi')
				.collection('tasks')
				.get()
				.then(collection => {
					this.list = collection.docs.map(this.mapList)
				})
		},
		mapList(task) {
			return { ...task.data(), id: task.id }
		},
		addTask(task) {
			firebase
				.firestore()
				.collection('projects')
				.doc('A1X83DUed6fOPqwt1iJi')
				.collection('tasks')
				.add(this.task)
				.catch(console.log)
		}
	}
}
</script>
<style lang="scss" scoped>
</style>