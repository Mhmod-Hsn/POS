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
			<b-form @submit.prevent="editUser">
				<b-form-group>
					<b-form-input
						id="name"
						placeholder="+ User Name"
						type="text"
						v-model="user.name"
					></b-form-input>
				</b-form-group>


				<b-form-group>
					<label for="money">money</label>
					<b-form-input
						id="money"
						max="99999999999999"
						min="0"
						placeholder="Money"
						type="number"
						v-model="user.money"
					></b-form-input>
				</b-form-group>

				<div class="d-flex flex-row-reverse">
					<b-button class="mx-1" type="submit" variant="primary">Submit
					</b-button>
					<b-button @click="showModal=false" class="mx-1"
					          variant="secondary">cancel
					</b-button>
				</div>

				<p class="text-danger mt-4" v-if="!!feedback">{{feedback}}</p>
			</b-form>

		</b-modal>

	</div>
</template>

<script>
  import db from '@/firebase/init'
  import slugify from 'slugify'

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
        ],
        user: {},
        feedback: null
      }
    },
    methods: {
      rowClicked(u) {
        this.showModal = true
        this.user.id = u.id
        this.user.name = u.name
        this.user.money = u.money
        this.user.slug = u.slug
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
      editUser() {
        // Slugify Name
        this.user.slug = slugify(this.user.name, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-#:@]/g,
          lower: true
        })

        db.collection("users").doc(this.user.id).update({
          name: this.user.name,
          money: this.user.money,
          slug: this.user.slug
        }).then(() => {
          this.showModal = false
          this.$swal('Edited', 'You successfully edited', 'success')
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