<template>
	<b-col class="m-0" lg="2" md="2" sm="2">
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
				:v-if="projects.length"
				v-for="(project, index) in projects"
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
				@deleteProject="deleteProjectAgent"
				@closeModal="toggleDeleteModal"
			></delete-modal>

			<b-modal title="Dodaj nowy projekt" v-model="isAddModalVisible" :lazy="true">
				<b-form @submit.prevent="addProjectAgent">
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
					<b-button
						class="float-right ml-1"
						variant="outline-primary"
						@click="addProjectAgent"
					>Dodaj projekt</b-button>
					<b-button class="float-right" variant="outline-danger" @click="toggleAddModal">Anuluj</b-button>
				</div>
			</b-modal>
		</b-nav>
	</b-col>
</template>
<script>
import { isNumber } from 'util'
import deleteModal from '@c/delete-modal.vue'
import Projects from '@/mixins/firestore/projects'

export default {
	mixins: [Projects],
	data() {
		return {
			newProject: {},
			isAddModalVisible: false,
			isDeleteModalVisible: false,
			deleteIndex: Number
		}
	},
	methods: {
		logout() {
			this.$router.push({ name: 'login' })
		},
		addProjectAgent() {
			if (this.newProject.title.length) {
				this.addProject(this.newProject)
				this.toggleAddModal()
			}
		},
		deleteProjectAgent() {
			this.deleteProject(this.deleteIndex)
			this.toggleDeleteModal()
		},
		toggleAddModal() {
			this.isAddModalVisible = !this.isAddModalVisible
		},
		toggleDeleteModal(index) {
			if (isNumber(index)) this.deleteIndex = index
			this.isDeleteModalVisible = !this.isDeleteModalVisible
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
	background-color: #454b51;

	#my-navbar {
		display: block;
		border-right: $gray-100;
	}
	.nav {
		.navbar-nav {
			.nav-link {
				color: $gray-100;
				transition: color 0.3s;
			}
			.nav-link:hover {
				color: $gray-500;
			}
		}
		hr {
			width: 100%;
			border: 2px solid $gray-100;
			border-radius: 7px;
			margin-top: 30px;
			margin-bottom: 30px;
		}
		.my-projects {
			margin-bottom: 5px;
			cursor: pointer;
			transition: color 0.3s;
		}
		.my-projects:hover {
			color: $gray-500;
		}
		#my-navbar-footer {
			text-align: right;
			width: 100%;
			position: absolute;

			.btn {
				color: $gray-100;
				transition: color 0.3s;
			}
			.btn:hover {
				color: $gray-500;
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
			border: 1px solid $gray-100;
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
