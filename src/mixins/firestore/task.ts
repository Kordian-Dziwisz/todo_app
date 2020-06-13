import { Vue, Prop, Component } from 'vue-property-decorator'
import Task from '@/classes/task'
export default class extends Vue {
	@Prop({ default: '' }) readonly projectID!: string
	@Prop({ default: '' }) readonly taskID!: string
	taskRef = require('firebase/app')
		.firestore()
		.doc(`projects/${this.projectID}/tasks/${this.taskID}`)
	task: any = undefined
	error: any = undefined
	created() {
		require('firebase/firestore')
		this._getTask()
	}
	_getTask() {
		this.taskRef
			.get()
			.then(this._setTask)
			.catch(this._catchError)
	}
	_setTask(task: any) {
		this.task = { ...task.data(), id: task.id }
	}
	saveTask(data: any) {
		this.task = data
		delete data.id
		this.taskRef.update(data)
	}
	toggleComplete() {
		this.taskRef.update({
			completed: this.task.completed ? false : true
		})
	}
	_catchError(err: any) {
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
