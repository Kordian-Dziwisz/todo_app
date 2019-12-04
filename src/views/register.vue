<template>
	<b-form @submit.prevent="register" class="container w-50">
		<h3>Wypełnij formularz, aby się zarejestrować</h3>
		<b-form-group>
			<label for="name">Imię:</label>
			<b-input
				type="text"
				class="form-control"
				placeholder="Wpisz imię"
				id="name"
				v-model="name"
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
				v-model="email"
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
				v-model="password"
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
				v-model="passwordConfirm"
				required
			></b-input>
		</b-form-group>
		<b-button type="submit" variant="primary" v-b-tooltip.hover.v-danger="error">Wyślij</b-button>
	</b-form>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export default {
	data() {
		return {
			email: '',
			password: '',
			passwordConfirm: '',
			name: '',
			error: ''
		}
	},
	created() {
		const self = this
		firebase.auth().signOut()
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				self.addUserToFirestore(user)
				this.$router.push({
					name: 'user-panel'
				})
			}
		})
	},
	computed: {
		isFormCompleted() {
			return (
				this.email !== '' &&
				this.password !== '' &&
				this.passwordConfirm !== '' &&
				this.name !== '' &&
				this.password === this.passwordConfirm
			)
		}
	},
	methods: {
		addUserToFirestore(user) {
			firebase
				.firestore()
				.collection('users')
				.doc(user.uid)
				.set({ email: this.email, name: this.name })
		},
		register() {
			if (this.isFormCompleted) {
				firebase
					.auth()
					.createUserWithEmailAndPassword(this.email, this.password)
					.catch(this.setError)
			} else {
				console.log("form isn't completed")
			}
		},
		setError(err) {
			switch (err.code) {
				case 'auth/email-already-in-use':
					this.error = 'adres email jest już w użyciu'
					break
				default:
					this.error = 'wystąpił nieznany błąd'
					break
			}
		}
	}
}
</script>
