<template>
	<div class="all-items container pt-3">
		<h1 class="page-title h3">All Items</h1>

		<b-overlay :show="showOverlay" rounded="sm">

			<div id="table">
				<b-input-group class="mt-3 mb-3" size="sm">
					<b-form-input placeholder="Search" type="text"
					              v-model="searchKeyword"></b-form-input>
				</b-input-group>
				<b-table
					:fields="fields"
					:items="items"
					:searchKeyword="searchKeyword"
					@row-clicked="rowClicked($event)"
					hover>

					<template v-slot:cell(actions)="data">
						<b-button
							@click="removeitem(data.item)"
							variant="danger">
							Remove
						</b-button>
					</template>

				</b-table>
			</div>
		</b-overlay>


	</div>
</template>

<script>
  import db from '@/firebase/init'

  export default {
    name: "AllItems",
    data() {
      return {
        showOverlay: null,
        searchKeyword: '',
        dataArray: [],
        fields: [
          {key: 'name', label: 'Name', sortable: true},
          {key: 'category', label: 'Category', sortable: true},
          {key: 'quantity', label: 'Quantity', sortable: true},
          {key: 'actions', label: 'Action'},
        ]
      }
    },
    methods: {
      rowClicked(event) {
        console.log(event.name)
      },
      removeitem(item) {
        var confirm =
          window.confirm('are you sure you want to remove item ' + item.name + ' ?')
        if (confirm) {
          this.showOverlay = true
          // Delete doc from firestore
          db.collection('item').doc(item.id).delete()
            .then(() => {
              this.dataArray = this.dataArray.filter(cat => {
                return cat.id !== item.id
              })
              this.showOverlay = false
            })
        }
      }

    },
    computed: {
      items() {
        return this.searchKeyword
          ? this.dataArray.filter(item =>
            item.name.includes(this.searchKeyword) ||
            item.category.includes(this.searchKeyword) ||
            item.quantity.includes(this.searchKeyword))
          : this.dataArray
      }
    },
    created() {
      db.collection('items').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let item = {}
            item.name = doc.data().name
            item.category = doc.data().category
            item.quantity = doc.data().quantity
            item.slug = doc.data().slug
            item.id = doc.id
            this.dataArray.push(item)
          })
        })
        .catch(e => {
          console.log('error:' + e)
        })
    }
  }
</script>

<style scoped>

</style>