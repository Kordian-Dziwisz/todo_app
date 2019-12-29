/**
 * firestore user object
 */
export default class {
	email: String
	name: String
	config: Object
	meta: Object
	constructor(args: any) {
		if (typeof args.email == 'string') {
			this.email = args.email
		} else {
			this.email = ''
		}
		if (typeof args.name == 'string') {
			this.name = args.name
		} else {
			this.name = ''
		}
		if (typeof args.config == 'object') {
			this.config = args.config
		} else {
			this.config = {}
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
	parseFirestore() {
		return JSON.parse(JSON.stringify(this))
	}
}
