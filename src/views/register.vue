<template>
	<form class="container w-50" @submit.prevent="register">
		<h3>Wypełnij formularz, aby się zarejestrować</h3>
		<div class="form-group">
			<label for="name">Imię:</label>
			<input
				type="text"
				class="form-control"
				placeholder="Wpisz imię"
				id="name"
				v-model="name"
				required
			/>
		</div>
		<div class="form-group">
			<label for="email">Email:</label>
			<input
				type="email"
				class="form-control"
				placeholder="Wpisz email"
				id="email"
				v-model="email"
				required
			/>
		</div>
		<div class="form-group">
			<label for="password">Hasło:</label>
			<input
				type="password"
				class="form-control"
				placeholder="Wpisz hasło:"
				id="password"
				v-model="password"
				required
			/>
		</div>
		<div class="form-group">
			<label for="password">Powtórz hasło:</label>
			<input
				type="password"
				class="form-control"
				placeholder="Powtórz hasło:"
				id="password-confirm"
				v-model="passwordConfirm"
				required
			/>
		</div>
		<button class="btn btn-primary" type="submit">Wyślij</button>
	</form>
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
			name: ''
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
			console.log('adding user to firestore', user)
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
					.catch(console.log)
			} else {
				console.log("form isn't completed")
			}
		}
	}
}
</script>
