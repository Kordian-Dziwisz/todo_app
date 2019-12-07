<template>
	<b-form @submit.prevent="signUp" class="container w-50">
		<h3>Wypełnij formularz, aby się zarejestrować</h3>
		<b-form-group>
			<label for="name">Imię:</label>
			<b-input
				type="text"
				class="form-control"
				placeholder="Wpisz imię"
				id="name"
				v-model="user.name"
				required
			></b-input>
		</b-form-group>
		<b-form-group>
			<label for="email">Email:</label>
			<b-input
				type="email"
				class="form-control"
				placeholder="Wpisz email"
				id="email"
				v-model="user.email"
				required
			></b-input>
		</b-form-group>
		<b-form-group>
			<label for="password">Hasło:</label>
			<b-input
				type="password"
				class="form-control"
				placeholder="Wpisz hasło:"
				id="password"
				v-model="user.password"
				required
			></b-input>
		</b-form-group>
		<b-form-group>
			<label for="password">Powtórz hasło:</label>
			<b-input
				type="password"
				class="form-control"
				placeholder="Powtórz hasło:"
				id="password-confirm"
				v-model="user.passwordConfirm"
				required
			></b-input>
		</b-form-group>
		<b-button type="submit" variant="primary" v-b-tooltip.hover.v-danger="error.message">Wyślij</b-button>
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
