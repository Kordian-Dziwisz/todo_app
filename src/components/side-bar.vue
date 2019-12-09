<template>
	<b-col class="m-0 bg-light" lg="2" md="2" sm="2">
		<b-nav class="vh-100" id="my-navbar" vertical>
			<b-navbar-brand @click="openFilter">todo_app</b-navbar-brand>
			<b-navbar-nav>
				<b-nav-item @click="openFilter">
					<font-awesome-icon :icon="['fas', 'user']" class="fa-fw a-secondary" secondary />Panel użytkownika
				</b-nav-item>
				<b-nav-item @click="openFilter">
					<font-awesome-icon :icon="['fas', 'star']" class="fa-fw" />Dzisiaj
				</b-nav-item>
				<b-nav-item @click="openFilter">
					<font-awesome-icon :icon="['fas', 'calendar-alt']" class="fa-fw" />Nadchodzące
				</b-nav-item>
				<b-nav-item @click="openFilter">
					<font-awesome-icon :icon="['fas', 'layer-group']" class="fa-fw" />Kiedyś
				</b-nav-item>
				<b-nav-item @click="openFilter">
					<font-awesome-icon :icon="['fas', 'archive']" class="fa-fw" />Wszystkie zadania
				</b-nav-item>
			</b-navbar-nav>
			<hr />
			<div
				class="my-projects container d-flex justify-content-between"
				:v-if="projectsList.length"
				v-for="(project, index) in projectsList"
				:key="project.id"
			>
				<a @click="openProject(project.id)">{{project.title}}</a>
				<b-btn
					@click="toggleDeleteModal(index)"
					class="btn-sm"
					id="my-delete-task-btn"
					variant="danger"
				>
					<font-awesome-icon :icon="['fas', 'trash-alt']" />
				</b-btn>
			</div>
			<div class="w-100 fixed-bottom" id="weird-navbar-footer"></div>
			<div class="fixed-bottom d-flex justify-content-between" id="my-navbar-footer">
				<b-btn variant="link" @click="toggleAddModal">
					<font-awesome-icon :icon="['fas', 'plus']" />
				</b-btn>
				<b-button-group>
					<b-btn variant="link">
						<font-awesome-icon :icon="['fas', 'cog']" id="my-cog" />
					</b-btn>
					<b-btn variant="link">
						<font-awesome-icon :icon="['fas', 'door-open']" @click="logout" />
					</b-btn>
				</b-button-group>
			</div>

			<delete-modal
				v-if="isDeleteModalVisible"
				:key="isDeleteModalVisible"
				:modalType="'project'"
				@deleteProject="deleteProject()"
				@closeModal="toggleDeleteModal()"
			></delete-modal>

			<b-modal title="Dodaj nowy projekt" v-model="isAddModalVisible" :lazy="true">
				<b-form @submit.prevent="addProject">
					<b-form-group>
						<label for="titleInput">Tytuł:</label>
						<b-form-input
							id="titleInput"
							type="text"
							v-model="newProject.title"
							placeholder="Tytuł projektu"
						></b-form-input>
					</b-form-group>
				</b-form>
				<div slot="modal-footer" class="w-100">
					<b-button class="float-right ml-1" variant="outline-primary" @click="addProject">Dodaj projekt</b-button>
					<b-button class="float-right" variant="outline-danger" @click="toggleAddModal">Anuluj</b-button>
				</div>
			</b-modal>
		</b-nav>
	</b-col>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { isNumber } from 'util'
import deleteModal from '@c/delete-modal.vue'

export default {
	data() {
		return {
			projectsList: [],
			projects: undefined,
			newProject: {
				title: ''
			},
			isAddModalVisible: false,
			isDeleteModalVisible: false,
			deleteIndex: Number
		}
	},
	created() {
		this.projects = firebase.firestore().collection('projects')
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.getProjectsList()
			}
		})
	},
	methods: {
		logout() {
			this.$router.push({ name: 'login' })
		},
		getProjectsList() {
			this.projects
				.where('creatorUID', '==', firebase.auth().currentUser.uid)
				.get()
				.then(projects => {
					this.projectsList = projects.docs.map(this.mapProjectsList)
				})
		},
		mapProjectsList(project) {
			return {
				...project.data(),
				id: project.id
			}
		},
		addProject() {
			if (this.newProject.title.length) {
				this.projects
					.add({
						...this.newProject,
						creatorUID: firebase.auth().currentUser.uid
					})
					.then(this.addProjectToList)
					.catch(console.log)
			}
		},
		addProjectToList(project) {
			this.projectsList.push({
				...this.newProject,
				id: project.id,
				creatorUID: firebase.auth().currentUser.uid
			})
			this.toggleAddModal()
			this.openProject(project.id)
		},
		toggleAddModal() {
			this.isAddModalVisible = !this.isAddModalVisible
		},
		deleteProject() {
			this.projects
				.doc(this.projectsList[this.deleteIndex].id)
				.delete()
				.catch(console.log())
			this.deleteProjectInLIst()
			this.toggleDeleteModal()
		},
		deleteProjectInLIst() {
			this.projectsList.splice(this.deleteIndex, 1)
		},
		toggleDeleteModal(index) {
			if (isNumber(index)) this.deleteIndex = index
			this.isDeleteModalVisible = !this.isDeleteModalVisible
		},
		openProject(projectID) {
			this.$emit('openProject', projectID)
			this.$router.push({
				name: 'user-panel',
				query: { projectID: projectID }
			})
		},
		openFilter(filter) {
			this.$emit('openFilter')
			this.$router.push({ name: 'user-panel' })
		}
	},
	components: {
		deleteModal
	}
}
</script>
<style scoped lang="scss">
@import '~bootstrap/scss/bootstrap';

.col-md-2 {
	#my-navbar {
		display: block;
	}
	.nav {
		.navbar-nav {
			.nav-link {
				color: $gray-600;
			}
			.nav-link:hover {
				color: $gray-700;
			}
		}
		hr {
			width: 100%;
			border: 2px solid grey;
			border-radius: 7px;
			margin-top: 30px;
			margin-bottom: 30px;
		}
		.my-projects {
			margin-bottom: 5px;
			cursor: pointer;
		}
		#my-navbar-footer {
			text-align: right;
			width: 100%;
			position: absolute;

			.btn {
				color: $gray-600;
			}
			.btn:hover {
				color: $gray-700;
			}
			.btn-group {
				#my-cog:hover {
					-webkit-animation: rotating 2s linear infinite;
				}
			}
		}
		#weird-navbar-footer {
			position: absolute;
			margin-right: 100px;
			border: 1px solid rgba(144, 144, 145, 0.3);
			margin-bottom: 40px;
		}
	}
}
@keyframes rotating {
	from {
		-webkit-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	to {
		-webkit-transform: rotate(360deg);
		-o-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}
</style>
