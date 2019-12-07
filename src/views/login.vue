<template>
	<b-form @submit.prevent="signIn" class="container w-50">
		<b-form-group>
			<p>Zaloguj się do serwisu</p>
			<label for="email">Email:</label>
			<b-input
				class="form-control"
				type="email"
				id="email"
				placeholder="Wpisz email"
				v-model="user.email"
				required
			></b-input>
		</b-form-group>
		<b-form-group>
			<label for="password">Hasło:</label>
			<b-input
				class="form-control"
				type="password"
				id="password"
				placeholder="Wpisz hasło"
				v-model="user.password"
				required
			></b-input>
		</b-form-group>
		<small>
			Nie masz konta?
			<router-link to="/register">Zarejestruj się</router-link>
		</small>
		<br />
		<b-button type="submit" variant="primary">Zaloguj się</b-button>
	</b-form>
</template>
<script>
import Auth from '@/mixins/auth'
export default {
	mixins: [Auth],
	created() {
		this.signOut()
		this.enableRedirectOnAuth()
	}
}
</script>
