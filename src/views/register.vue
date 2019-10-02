<template>
	<form class="container w-50">
		<h3>Wypełnij formularz, aby się zarejestrować</h3>
		<div class="form-group">
			<label for="name">Imię:</label>
			<input type="text" class="form-control" placeholder="Wpisz imię" id="name" required />
		</div>
		<div class="form-group">
			<label for="email">Email:</label>
			<input type="email" class="form-control" placeholder="Wpisz email" id="email" required />
		</div>
		<div class="form-group">
			<label for="password">Hasło:</label>
			<input type="password" class="form-control" placeholder="Wpisz hasło:" id="password" required />
		</div>
		<div class="form-group">
			<label for="password">Powtórz hasło:</label>
			<input type="password" class="form-control" placeholder="Powtórz hasło:" id="password" required />
		</div>
		<button class="btn btn-primary" type="submit">Wyślij</button>
	</form>
</template>