<template>
	<div class="h-100">
		<nav class="navbar navbar-light bg-light mr-0 col-2 vh-100 flex-column" id="my-navbar">
			<a class="navbar-brand" href="#">todo_app</a>
			<ul class="navbar-nav">
				<li class="nav-item active">
					<a class="nav-link" href="#"><font-awesome-icon :icon="['fas', 'user']"/> Panel użytkownika<span class="sr-only">(current)</span></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"><font-awesome-icon :icon="['fas', 'star']"/> Dzisiaj</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"><font-awesome-icon :icon="['fas', 'calendar-alt']"/> Natchodzące</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"><font-awesome-icon :icon="['fas', 'layer-group']"/> Kiedyś</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#"><font-awesome-icon :icon="['fas', 'archive']"/> Wszystkie zadania</a>
				</li>
				<div class="divider"></div>
			</ul>
			<ul class="navbar-nav">
				<li class="navbar-brand"><a href="#" class="nav-link">Zadanie1</a></li>
				<ul class="navbar-nav">
					<a href="#" class="nav-link">Podzadanie1</a>
					<a href="#" class="nav-link">Podzadanie2</a>
				</ul>
			</ul>
			<ul class="navbar-nav">
				<li class="navbar-brand"><a href="#" class="nav-link">Zadanie1</a></li>
				<ul class="navbar-nav">
					<a href="#" class="nav-link">Podzadanie1</a>
					<a href="#" class="nav-link">Podzadanie2</a>
				</ul>
			</ul>
			<div class="divider fixed-bottom" id="weird-navbar-footer"></div>
			<div class="fixed-bottom" id="my-navbar-footer">
				<button class="btn"><font-awesome-icon :icon="['fas', 'cog']"/></button>
			</div>
		</nav>
	</div>
</template>
<style scoped lang="scss">
	#my-navbar-footer {
		text-align: right;
		width: 100%;
		position: absolute;
	};
	#my-navbar {
		display: block;
	};
	#weird-navbar-footer {
		position: absolute;
		margin-right: 100px;
		border: 1px solid rgba(144, 144, 145, 0.3);
		margin-bottom: 40px;

	};
	.divider {
		width: 100%;
		border: 2px solid grey;
		border-radius: 7px;
		margin-top: 30px;
		margin-bottom: 30px;
	};
</style>
<script>
	import { library } from '@fortawesome/fontawesome-svg-core'
	import { faUser } from '@fortawesome/free-solid-svg-icons'
	import { faStar } from '@fortawesome/free-solid-svg-icons'
	import { faCog } from '@fortawesome/free-solid-svg-icons'
	import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
	import { faLayerGroup } from '@fortawesome/free-solid-svg-icons'
	import { faArchive } from '@fortawesome/free-solid-svg-icons'

	library.add(faUser)
	library.add(faStar)
	library.add(faCalendarAlt)
	library.add(faLayerGroup)
	library.add(faArchive)
	library.add(faCog)

	export default {}
</script>