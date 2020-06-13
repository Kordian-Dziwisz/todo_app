/**
 * firestore task object
 */
import ITask from '@/interfaces/task'
export default class Task implements ITask {
	title: string = ''
	description: string = ''
	isCompleted: boolean = false
	duedate: String = new Date(Date.now()).toISOString()
	labels: Array<string> = []
	meta: object = {}
	id: string = ''
	constructor(args: any) {
		if (typeof args.id === 'string') {
			this.id = args.id
		}
		if (typeof args.title === 'string') {
			this.title = args.title
		}
		if (typeof args.description === 'string') {
			this.description = args.description
		}
		if (typeof args.isCompleted === 'boolean') {
			this.isCompleted = args.isCompleted
		}
		if (typeof args.duedate === 'string') {
			this.duedate = args.duedate
		}
		if (args.labels instanceof Array) {
			if (
				args.labels.every((UID: String) => {
					typeof UID === 'string'
				})
			) {
				this.labels = args.labels
			}
		}
		if (typeof args.meta == 'object') {
			this.meta = args.meta
		}
	}
	/**
	 * prepare for firebase, firebase don't accept custom classes so convert to JSON and back to Object
	 */
	parseFirebase() {
		let task = this
		delete task.id
		return JSON.parse(JSON.stringify(this))
	}
}
