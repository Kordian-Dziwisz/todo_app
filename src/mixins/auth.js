export default {
	data() {
		return {
			auth: require('firebase/app').auth(),
			firestore: require('firebase/app').firestore(),
			user: {
				email: '',
				password: '',
				passwordConfirm: '',
				name: ''
			},
			error: Object,
			_redirect: false
		}
	},
	created() {
		require('firebase/auth')
		require('firebase/firestore')
	},
	methods: {
		signOut() {
			this.auth.signOut().catch(this._catchError)
		},
		signIn() {
			if (this._redirect) {
				const self = this
				this.auth.onAuthStateChanged(user => {
					if (user) self.$router.push({ name: 'user-panel' })
				})
			}
			this.auth
				.signInWithEmailAndPassword(this.user.email, this.user.password)
				.catch(this._catchError)
		},
		signUp() {
			const self = this
			this.auth.onAuthStateChanged(user => {
				if (user) {
					self._addUserToFirestore(user)
					if (self._redirect)
						self.$router.push({ name: 'user-panel' })
				}
			})
			this.auth
				.createUserWithEmailAndPassword(
					this.user.email,
					this.user.password
				)
				.catch(this._catchError)
		},
		_addUserToFirestore(user) {
			this.firestore
				.doc('users/' + user.uid)
				.set({ email: this.user.email, name: this.user.name })
		},
		_catchError(err) {
			this.error = err
			switch (err.code) {
				case 'auth/email-already-in-use':
					this.error.message = 'adres email jest już w użyciu'
					break
				default:
					this.error.message = 'wystąpił nieznany błąd'
					break
			}
			console.log(err)
		},
		enableRedirectOnAuth() {
			this._redirect = true
		}
	}
}
