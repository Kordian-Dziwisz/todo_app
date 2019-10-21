<template>
	<div class="card h-50 col-5">
		<div class="card-body">
			<h5 class="card-title">Tytuł</h5>
			<h6 class="card-subtitle mb-2 text-muted">Podtytuł</h6>
			<p
				class="card-text"
			>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer molestie pretium pellentesque. Praesent elit dui, tempor non imperdiet sed, egestas eget felis. Quisque quis elit nunc. Aenean erat quam, aliquam vel nunc eu, pulvinar laoreet purus. Curabitur non eros nisl. Curabitur viverra commodo dolor fermentum dignissim. Maecenas id vulputate tellus. Nulla volutpat imperdiet rutrum. Proin fermentum diam ut odio semper gravida et in erat. In quis odio sapien. Ut finibus elit a euismod placerat. Aenean felis diam, congue sed neque sed, blandit suscipit neque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.</p>
		</div>
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
			list: [],
			newTask: {
				title: '',
				content: ''
			}
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
		addTask() {
			firebase
				.firestore()
				.collection('projects')
				.doc('A1X83DUed6fOPqwt1iJi')
				.collection('tasks')
				.add(this.newTask)
				.catch(console.log)
		}
	}
}
</script>
<style lang="scss" scoped>
</style>