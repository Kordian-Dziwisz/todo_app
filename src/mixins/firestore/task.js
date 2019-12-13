export default {
	props: {
		projectID: String,
		taskID: String
	},
	data() {
		return {
			taskRef: require('firebase/app')
				.firestore()
				.doc(`projects/${this.projectID}/tasks/${this.taskID}`),
			task: {}
		}
	},
	created() {
		require('firebase/firestore')
		this._getTask()
	},
	methods: {
		_getTask() {
			this.taskRef
				.get()
				.then(this._setTask)
				.catch(this._catchError)
		},
		_setTask(task) {
			this.task = { ...task.data(), id: task.id }
		},
		saveTask(data) {
			this.task = data
			delete data.id
			this.taskRef.update(data)
		},
		toggleComplete() {
			this.taskRef.update({
				completed: this.task.completed ? false : true
			})
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
		}
	}
}
