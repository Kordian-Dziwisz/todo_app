import { Vue, Prop, Component } from 'vue-property-decorator'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Task from '@/classes/task'
import ITask from '@/interfaces/task'
@Component
export default class TaskMixin extends Vue {
	@Prop({ default: '' }) readonly projectID!: string
	@Prop({ default: '' }) readonly taskID!: string

	taskRef: firebase.firestore.DocumentReference = firebase
		.firestore()
		.doc(`projects/${this.projectID}/tasks/${this.taskID}`)
	task: Task = new Task({})
	error: any = {}
	created() {
		this._getTask()
	}
	_getTask() {
		this.taskRef
			.get()
			.then(this._setTask)
			.catch(this._catchError)
	}
	_setTask(task: firebase.firestore.DocumentSnapshot) {
		this.task = new Task({ ...task.data(), id: task.id })
	}
	saveTask(data: ITask) {
		this.task = new Task(data)
		this.taskRef.update(data)
	}
	toggleComplete() {
		this.taskRef.update({
			completed: this.task.isCompleted ? false : true
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
