<template>
	<b-col class="m-0 bg-light" lg="2" md="2" sm="2">
		<b-nav class="vh-100" id="my-navbar" vertical>
            <b-navbar-brand href="/user-panel">todo_app</b-navbar-brand>
			<b-navbar-nav>
				<b-nav-item href="/user-panel">
                    <font-awesome-icon :icon="['fas', 'user']" class="fa-fw a-secondary" /> Panel użytkownika
				</b-nav-item>
				<b-nav-item href="/user-panel">
                    <font-awesome-icon :icon="['fas', 'star']" class="fa-fw" /> Dzisiaj
				</b-nav-item>
				<b-nav-item href="/user-panel">
					<font-awesome-icon :icon="['fas', 'calendar-alt']" class="fa-fw" /> Nadchodzące
				</b-nav-item>
				<b-nav-item href="/user-panel">
					<font-awesome-icon :icon="['fas', 'layer-group']" class="fa-fw" /> Kiedyś
				</b-nav-item>
				<b-nav-item href="/user-panel">
                    <font-awesome-icon :icon="['fas', 'archive']" class="fa-fw" /> Wszystkie zadania
				</b-nav-item>
			</b-navbar-nav>
			<div class="divider"></div>
			<!-- <ul class="navbar-nav">
				<li class="navbar-brand">
					<a class="nav-link" href="/user-panel">
						<h3>Zadanie1</h3>
					</a>
				</li>
				<ul class="navbar-nav">
					<a href="/user-panel" class="nav-link">Podzadanie1</a>
					<a href="/user-panel" class="nav-link">Podzadanie2</a>
				</ul>
			</ul>
			<ul class="navbar-nav">
				<li class="navbar-brand">
					<a class="nav-link" href="/user-panel">
						<h3>Zadanie2</h3>
					</a>
				</li>
				<ul class="navbar-nav">
					<a href="/user-panel" class="nav-link">Podzadanie1</a>
					<a href="/user-panel" class="nav-link">Podzadanie2</a>
				</ul>
			</ul>
			-->
			<div class="divider fixed-bottom" id="weird-navbar-footer"></div>
			<div class="fixed-bottom d-flex justify-content-between" id="my-navbar-footer">
				<b-btn variant="link">
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
		</b-nav>
	</b-col>
</template>
<script>
    import firebase from 'firebase/app'
    import 'firebase/firestore'

    export default {
	data() {
		return {
			projectsList: [],
			projects: undefined
		}
	},
	created() {
		this.projects = firebase.firestore().collection('projects')
		this.getProjectsList()
	},
	methods: {
		logout() {
			this.$router.push({ name: 'login' })
		},
		getProjectsList() {
			this.projects.get().then(projects => {
				this.projectsList = projects.docs.map(this.mapProjectsList)
			})
		},
		mapProjectsList(project) {
			return {
				...project.data(),
				id: project.id
			}
		}
	}
}
</script>
<style scoped lang="scss">
#my-navbar-footer {
	text-align: right;
	width: 100%;
	position: absolute;
}
#my-navbar {
	display: block;
}
#weird-navbar-footer {
	position: absolute;
	margin-right: 100px;
	border: 1px solid rgba(144, 144, 145, 0.3);
	margin-bottom: 40px;
}
.divider {
	width: 100%;
	border: 2px solid grey;
	border-radius: 7px;
	margin-top: 30px;
	margin-bottom: 30px;
}
#my-cog:hover {
	-webkit-animation: rotating 2s linear infinite;
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
