<template>
	<div class="col-2 m-0 p-0">
		<nav class="navbar navbar-light bg-light mr-0 vh-100 flex-column m-0" id="my-navbar">
			<a class="navbar-brand" href="/user-panel">todo_app</a>
			<ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link" href="/user-panel">
						<i class="fas fa-user fa-fw"></i> Panel użytkownika
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/user-panel">
						<i class="fas fa-star fa-fw"></i> Dzisiaj
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/user-panel">
						<i class="fas fa-calendar-alt fa-fw"></i> Nadchodzące
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/user-panel">
						<i class="fas fa-layer-group fa-fw"></i> Kiedyś
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/user-panel">
						<i class="fas fa-archive fa-fw"></i> Wszystkie zadania
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
					<i class="fas fa-plus fa-fw"></i> Nowy projekt
				</button>
				<button class="btn">
					<i class="fas fa-cog fa-fw"></i>
				</button>
			</div>
		</nav>
	</div>
</template>
<script>
export default {
	methods: {
		logout() {
			this.$router.push({ name: 'login' })
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
