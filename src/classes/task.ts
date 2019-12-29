/**
 * firestore task object
 */
export default class {
	title: string
	description: string
	isCompleted: boolean
	duedate: string
	labels: Array<String>
	meta: object
	constructor(args: any) {
		if (typeof args.title == 'string') {
			this.title = args.title
		} else {
			this.title = ''
		}
		if (typeof args.description == 'string') {
			this.description = args.description
		} else {
			this.description = ''
		}
		if (typeof args.isCompleted == 'boolean') {
			this.isCompleted = args.isCompleted
		} else {
			this.isCompleted = false
		}
		if (typeof args.duedate == 'string') {
			this.duedate = args.duedate
		} else {
			this.duedate = new Date(Date.now()).toDateString()
		}
		if (args.labels instanceof Array) {
			if (
				args.labels.every((UID: String) => {
					typeof UID === 'string'
				})
			) {
				this.labels = args.labels
			} else {
				this.labels = []
			}
		} else {
			this.labels = []
		}
		if (typeof args.meta == 'object') {
			this.meta = args.meta
		} else {
			this.meta = {}
		}
	}
	/**
	 * prepare for firebase, firebase don't accept custom classes so convert to JSON and back to Object
	 */
	parseFirebase() {
		return JSON.parse(JSON.stringify(this))
	}
}
