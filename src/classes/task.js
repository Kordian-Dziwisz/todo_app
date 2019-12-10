/**
 * firebase task object
 * @property {String} title
 * @property {String} description
 * @property {Boolean} isCompleted
 * @method parseFirebase
 */
export class Task {
	constructor(args) {
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
	}
	/**
	 * prepare for firebase, firebase don't accept custom classes
	 * @return {Object} object parsed to JSON and then to object again
	 */
	parseFirebase() {
		return JSON.parse(JSON.stringify(this))
	}
}
