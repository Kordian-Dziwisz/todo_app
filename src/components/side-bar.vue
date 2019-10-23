<template>
	<div class="col-2 m-0 p-0">
		<nav class="navbar navbar-light bg-light mr-0 vh-100 flex-column m-0" id="my-navbar">
			<a class="navbar-brand" href="/user-panel">todo_app</a>
			<ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link" href="/user-panel">
						<font-awesome-icon :icon="['fas', 'user']" class="fa-fw" />
						Panel użytkownika
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/user-panel">
						<font-awesome-icon :icon="['fas', 'star']" class="fa-fw" />
						Dzisiaj
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/user-panel">
						<font-awesome-icon :icon="['fas', 'calendar-alt']" class="fa-fw" />
						Natchodzące
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/user-panel">
						<font-awesome-icon :icon="['fas', 'layer-group']" class="fa-fw" />
						Kiedyś
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/user-panel">
						<font-awesome-icon :icon="['fas', 'archive']" class="fa-fw" />
						Wszystkie zadania
					</a>
				</li>
			</ul>
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
				<button class="btn">
					<font-awesome-icon :icon="['fas', 'plus']" /> Nowe zadanie
				</button>
				<button class="btn">
					<font-awesome-icon :icon="['fas', 'cog']" />
				</button>
			</div>
		</nav>
	</div>
</template>
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
</style>

<script>
export default {}
</script>
