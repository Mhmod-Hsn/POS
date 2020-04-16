<template>
	<div class="add-items container pt-3">
		<div class="card shadow mt-3 bg-white">

			<b-overlay :show="showOverlay" rounded="sm">

				<div class="card-header">
					<h2>Add new item</h2>
				</div>

				<div class="card-body ">

					<b-form @submit.prevent="addItem">
						<b-form-group>
							<b-form-input
								id="name"
								placeholder="+ item Name"
								type="text"
								v-model="item.name"
							></b-form-input>
						</b-form-group>

						<b-form-group>
							<v-select :options="categories" :reduce="cat =>
						cat.text" label="text" v-model="item.category"></v-select>
						</b-form-group>


						<b-form-group>
							<label for="quantity">Quantity</label>
							<b-form-spinbutton id="quantity" min="1"
							                   v-model="item.quantity"></b-form-spinbutton>
						</b-form-group>


						<b-button type="submit" variant="primary">Submit</b-button>
						<p class="text-danger mt-4" v-if="!!feedback">{{feedback}}</p>
					</b-form>
				</div>
			</b-overlay>
		</div>

	</div>
</template>

<script>
  import db from '@/firebase/init'
  import slugify from 'slugify'

  export default {
    name: "AddItems",
    data() {
      return {
        showOverlay: null,
        feedback: null,
        item: {
          name: null,
          category: null,
          quantity: null,
          slug: null
        },
        categories: []
      }
    },
    methods: {
      addItem() {
        if (this.item.name && this.item.category && this.item.quantity >= 1) {
          this.showOverlay = true

          // Slugify Name
          this.item.slug = slugify(this.item.name, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-#:@]/g,
            lower: true
          })


          db.collection('items').add({
            name: this.item.name,
            slug: this.item.slug,
            category: this.item.category,
            quantity: this.item.quantity
          }).then(() => {
            this.$swal('Success', `${this.item.name} ( ${this.item.quantity} ) added successfully`, 'success')

            this.item = {}
            this.feedback = null
            this.showOverlay = false
          })
        } else {
          this.feedback =
            `check one of the following errors
		        1-enter item name
		        2-choose item category
		        3-quantity must be more than 1`
        }
      }
    },
    computed: {},
    created() {
      db.collection('categories').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let cat = {}
            cat.value = doc.data().slug
            cat.text = doc.data().name
            cat.id = doc.id
            this.categories.push(cat)
          })
        })
    }
  }
</script>

<style scoped>

</style>