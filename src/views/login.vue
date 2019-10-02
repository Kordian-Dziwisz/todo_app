<template>
	<form class="container w-50" @submit.prevent="login">
		<div class="form-group">
			<p>Zaloguj się do serwisu</p>
			<label for="email">Email:</label>
			<input
				class="form-control"
				type="email"
				id="email"
				placeholder="Wpisz email"
				v-model="email"
				required
			/>
		</div>
		<div class="form-group">
			<label for="password">Hasło:</label>
			<input
				class="form-control"
				type="password"
				id="password"
				placeholder="Wpisz hasło"
				v-model="password"
				required
			/>
		</div>
		<small>
			Nie masz konta?
			<router-link to="/register">Zarejestruj się</router-link>
		</small>
		<br />
		<button class="btn btn-primary" type="submit">Zaloguj się</button>
	</form>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
	data() {
		return {
			email: '',
			password: ''
		}
	},
	methods: {
		login() {
			firebase
				.auth()
				.signInWithEmailAndPassword(this.email, this.password)
				.catch(err => {
					console.log(err.code, err.message)
				})
		}
	}
}
</script>