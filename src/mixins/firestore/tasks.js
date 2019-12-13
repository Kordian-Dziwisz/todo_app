export default {
	props: {
		projectID: String
	},
	data() {
		return {
			tasksRef: require('firebase/app')
				.firestore()
				.collection(`projects/${this.projectID}/tasks`),
			tasks: [],
			redirect: false
		}
	},
	created() {
		require('firebase/firestore')
		this._getTasks()
	},
	methods: {
		_getTasks() {
			this.tasksRef.get().then(this._setTasks)
		},
		/**
		 * set tasks as mapped tasks list
		 * @param {QuerySnapchot} project firebase project
		 * @return {Object} task data + id
		 */
		_setTasks(tasks) {
			this.tasks = tasks.docs.map(task => {
				return { ...task.data(), id: task.id }
			})
		},
		async addTask(data) {
			const Task = require('@/classes/task').default
			const ref = await this.tasksRef
				.add(new Task(data).parseFirebase())
				.catch(this._catchError)
			this._addTaskToList(await ref.get())
		},
		_addTaskToList(task) {
			this.tasks.push({ ...task.data(), id: task.id })
			if (this.redirect) this.openTask(task.id)
		},
		/**
		 * redirect and emit 'openTask'
		 * @param {String} id task ID
		 * @emits VueComponent#openTask
		 */
		openTask(id) {
			/**
			 * emits open task for change in user-panel
			 * @event VueComponent#openTask
			 * @type {string}
			 */
			this.$emit('openTask', id)
			this.$router.push({
				name: 'user-panel',
				query: { projectID: this.projectID, taskID: id }
			})
		},
		deleteTask(index) {
			this.tasksRef
				.doc(this.tasks[index].id)
				.delete()
				.then(this._deleteTaskInList(index))
				.catch(this._catchError)
		},
		_deleteTaskInList(index) {
			this.tasks.splice(index, 1)
		},
		_catchError(err) {
			this.error = err
			switch (err.code) {
				case 'permission-denied':
					this.error.message = 'niewystarczające uprawnienia'
					break
				default:
					this.error.message = 'wystąpił nieznany błąd'
			}
			console.log(err)
		},
		enableRedirect() {
			this.redirect = true
		}
	}
}
