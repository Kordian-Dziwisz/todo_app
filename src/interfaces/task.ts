export default interface ITask {
	title: string
	description: string
	isCompleted: boolean
	duedate: String
	labels: Array<string>
	meta: object
}
