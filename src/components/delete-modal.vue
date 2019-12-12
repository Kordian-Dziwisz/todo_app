<template>
	<b-modal :title="title" v-model="isModalVisible" :lazy="true">
		<p>Czy na pewno chcesz usunąć {{ messageInModal }}?</p>
		<div slot="modal-footer" class="w-100">
			<b-button class="float-right ml-1" variant="outline-primary" @click="deleteElement()">Usuń</b-button>
			<b-button class="float-right" variant="outline-danger" @click="closeModal()">Anuluj</b-button>
		</div>
	</b-modal>
</template>
<script>
export default {
	props: {
		modalType: String
	},
	data() {
		return {
			isModalVisible: true
		}
	},
	methods: {
		deleteElement() {
			switch (this.modalType) {
				case 'project':
					this.$emit('deleteProject')
					break
				case 'task':
					this.$emit('deleteTask')
					break
			}
		},
		closeModal() {
			this.$emit('closeModal')
		}
	},
	computed: {
		title() {
			switch (this.modalType) {
				case 'project':
					return 'Usuwanie projektu'
					break
				case 'task':
					return 'Usuwanie zadania'
					break
				default:
					return ''
			}
		},
		messageInModal() {
			switch (this.modalType) {
				case 'project':
					return 'ten projekt'
					break
				case 'task':
					return 'to zadanie'
					break
				default:
					return ''
			}
		}
	}
}
</script>