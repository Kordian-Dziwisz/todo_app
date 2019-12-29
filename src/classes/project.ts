/**
 * firestore project object
 */
export default class {
	title: String
	creatorUID: String
	collaboratorsUIDs: Array<String>
	meta: Object
	constructor(args: any) {
		if (typeof args.title === 'string') {
			this.title = args.title
		} else {
			this.title = ''
		}
		if (typeof args.creatorUID === 'string') {
			this.creatorUID = args.creatorUID
		} else {
			this.creatorUID = ''
		}
		if (args.collaboratorsUIDs instanceof Array) {
			if (
				args.collaboratorsUIDs.every((UID: String) => {
					typeof UID === 'string'
				})
			) {
				this.collaboratorsUIDs = args.collaboratorsUIDs
			} else {
				this.collaboratorsUIDs = []
			}
		} else {
			this.collaboratorsUIDs = []
		}
		if (typeof args.meta === 'object') {
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
