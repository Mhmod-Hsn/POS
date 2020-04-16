<template>
	<div class="all-users container pt-3">
		<h2>All Users</h2>

		<b-overlay :show="showOverlay" rounded="sm">

			<div id="table">
				<b-input-group class="mt-3 mb-3" size="sm">
					<b-form-input placeholder="Search" type="text"
					              v-model="searchKeyword"></b-form-input>
				</b-input-group>


				<b-table
					:current-page="currentPage"
					:fields="fields"
					:items="items"
					:per-page="perPage"
					:searchKeyword="searchKeyword"
					@row-clicked="rowClicked($event)"
					hover
					id="itemsTable">

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

		<div class="d-flex justify-content-center mt-3">
			<b-pagination
				:per-page="perPage"
				:total-rows="rows"
				aria-controls="itemsTable"
				pills
				v-model="currentPage"
			></b-pagination>
		</div>

		<!--		Editing Modal-->
		<b-modal :visible="showModal" cancel-disabled centered hide-footer
		         id="editing-modal"
		         ignore-enforce-focus-selector
		         no-close-on-backdrop
		         no-close-on-esc
		         no-enforce-focus
		         ok-disabled
		         title="Edit"
		>
			<p class="my-4">Hello from modal!</p>
		</b-modal>
	</div>
</template>

<script>
  import db from '@/firebase/init'

  export default {
    name: "AllUsers",
    data() {
      return {
        showModal: false,
        perPage: 20,
        currentPage: 1,
        showOverlay: null,
        searchKeyword: '',
        dataArray: [],
        fields: [
          {key: 'name', label: 'Name', sortable: true},
          {key: 'money', label: 'Money', sortable: true},
          {key: 'actions', label: 'Action'},
        ]
      }
    },
    methods: {
      rowClicked(user) {
        // this.showModal=true
        console.log(user)

        this.$swal({
          title: 'Are you sure?',
          input: 'number',
          inputAttributes: {
            min: 0
          },
          icon: 'warning',
          showCancelButton: false,
          confirmButtonText: 'Edit!',
          cancelButtonText: 'Keep it!',
          showCloseButton: true,
          preConfirm: (number) => {
            db.collection("users").doc(user.id).update({
              money: number
            }).then(() => {
              this.$swal('Edited', 'You successfully edited', 'success')
            })
          },
        })

      },
      removeitem(item) {
        this.$swal({
          title: 'Are you sure?',
          text: 'You can\'t revert your action',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes Delete it!',
          cancelButtonText: 'No, Keep it!',
          showCloseButton: true
        }).then((result) => {
          if (result.value) {
            this.showOverlay = true
            // Delete doc from firestore
            db.collection('users').doc(item.id).delete()
              .then(() => {
                this.dataArray = this.dataArray.filter(i => {
                  return i.id !== item.id
                })
                this.$swal('Deleted', `You successfully deleted ${item.name}`,
                  'success')
                this.showOverlay = false
              })
          }
        })

      },

    },
    computed: {
      rows() {
        return this.dataArray.length
      },
      items() {
        // return this.dataArray
        return this.searchKeyword ? this.dataArray.filter(i =>
            i.name.includes(this.searchKeyword))
          : this.dataArray
      }
    },
    created() {
      db.collection('users').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let item = {}
            item.id = doc.id
            item.name = doc.data().name
            item.money = doc.data().money
            item.slug = doc.data().slug
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