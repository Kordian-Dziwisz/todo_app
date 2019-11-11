<template>
	<b-form @submit.prevent="register" class="container w-50">
		<h3>Wypełnij formularz, aby się zarejestrować</h3>
		<b-form-control>
			<label for="name">Imię:</label>
			<b-input
				type="text"
				class="form-control"
				placeholder="Wpisz imię"
				id="name"
				v-model="name"
				required
			></b-input>
		</b-form-control>
		<b-form-control>
			<label for="email">Email:</label>
			<b-input
				type="email"
				class="form-control"
				placeholder="Wpisz email"
				id="email"
				v-model="email"
				required
			></b-input>
		</b-form-control>
		<b-form-control>
			<label for="password">Hasło:</label>
			<b-input
				type="password"
				class="form-control"
				placeholder="Wpisz hasło:"
				id="password"
				v-model="password"
				required
			></b-input>
		</b-form-control>
		<b-form-control>
			<label for="password">Powtórz hasło:</label>
			<b-input
				type="password"
				class="form-control"
				placeholder="Powtórz hasło:"
				id="password-confirm"
				v-model="passwordConfirm"
				required
			></b-input>
		</b-form-control>
		<br>
		<b-button type="submit" variant="primary">Wyślij</b-button>
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
