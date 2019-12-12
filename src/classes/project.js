/**
 * firebase project object
 * @property {String} title
 * @property {String} creatorUID
 * @method parseFirebase
 */
export default class {
	constructor(args) {
		if (typeof args.title == 'string') {
			this.title = args.title
		} else {
			this.title = ''
		}
		if (typeof args.creatorUID == 'string') {
			this.creatorUID = args.creatorUID
		} else {
			this.creatorUID = ''
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
