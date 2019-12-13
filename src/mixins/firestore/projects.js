export default {
	data() {
		return {
			auth: require('firebase/app').auth(),
			projectsRef: require('firebase/app')
				.firestore()
				.collection('projects'),
			projects: [],
			redirect: false
		}
	},
	created() {
		require('firebase/firestore')
		this._getProjects()
	},
	methods: {
		_getProjects() {
			this.projectsRef
				.where('creatorUID', '==', this.auth.currentUser.uid)
				.get()
				.then(this._setProjects)
		},
		_setProjects(projects) {
			this.projects = projects.docs.map(project => {
				return { ...project.data(), id: project.id }
			})
		},
		async addProject(data) {
			const Project = require('@/classes/project').default
			const ref = await this.projectsRef
				.add(
					new Project({
						...data,
						creatorUID: this.auth.currentUser.uid
					}).parseFirebase()
				)
				.catch(this._catchError)
			this._addProjectToList(await ref.get())
		},
		_addProjectToList(project) {
			this.projects.push({ ...project.data(), id: project.id })
			if (this.redirect) this.openProject(project.id)
		},
		openProject(id) {
			/**
			 * emits open project for change in user-panel
			 * @event VueComponent#openProject
			 * @type {string}
			 */
			this.$emit('openProject', id)
			this.$router.push({
				name: 'user-panel',
				query: { projectID: id }
			})
		},
		deleteProject(index) {
			this.projectRef
				.doc(this.projects[index].id)
				.delete()
				.then(this._deleteProjectInList(index))
				.catch(this._catchError)
		},
		_deleteProjectInList(index) {
			this.projects.splice(index, 1)
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
		},
		enableRedirect() {
			this.redirect = true
		}
	}
}
