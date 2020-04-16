<template>
	<div class="all-categories  container pt-3">
		<h1 class="page-title h3">All Items</h1>
		<b-overlay :show="showOverlay" rounded="sm">
			<b-table
				:fields="fields"
				:items="categories"
				hover
				outlined>
				<template v-slot:cell(index)="data">
					{{ data.index + 1 }}
				</template>
				<!-- A virtual composite column -->
				<template v-slot:cell(actions)="data">
					<b-button
						@click="removeCategory(data.item)"
						variant="danger">
						Remove
					</b-button>
				</template>
			</b-table>
		</b-overlay>
	</div>

</template>

<script>
  import db from '@/firebase/init'

  export default {
    name: "AllCategories",
    data() {
      return {
        showOverlay: null,
        categories: [],
        fields: [
          // A virtual column that doesn't exist in items
          'Index',
          {key: 'name', label: 'Name'},
          {key: 'actions', label: 'Action'},
        ]
      }
    },
    created() {
      db.collection('categories').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let cat = doc.data()
            cat.id = doc.id
            this.categories.push(cat)
          })
        })
    },
    methods: {
      removeCategory(item) {

        var confirm =
          window.confirm('are you sure you want to remove category ' + item.name + ' ?')
        if (confirm) {
          this.showOverlay = true
          // Delete doc from firestore
          db.collection('categories').doc(item.id).delete()
            .then(() => {
              this.categories = this.categories.filter(cat => {
                return cat.id !== item.id
              })
              this.showOverlay = false
            })
        }
      }
    }
  }
</script>

<style scoped>

</style>