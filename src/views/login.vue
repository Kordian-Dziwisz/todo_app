<template>
	<form class="container w-50">
		<div class="form-group">
			<h3>Zaloguj się do serwisu</h3>
			<label for="email">Login:</label>
			<input class="form-control" type="email" id="email" placeholder="Wpisz email" required />
		</div>
		<div class="form-group">
			<label for="password">Hasło:</label>
			<input class="form-control" type="password" id="password" placeholder="Wpisz hasło" required />
		</div>
		<small>
			Nie masz konta?
			<router-link to="/register">Zarejestruj się</router-link>
		</small>
		<br />
		<button class="btn btn-primary" type="submit">Zaloguj się</button>
	</form>
</template>