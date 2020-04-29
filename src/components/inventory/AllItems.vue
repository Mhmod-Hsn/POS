<template>
	<div class="all-items container pt-3">
		<h1 class="page-title h3">All Items</h1>

		<b-overlay :show="showOverlay" rounded="sm">

			<div id="table">
				<b-input-group class="mt-3 mb-3" size="sm">
					<b-form-input placeholder="Search" type="text"
					              v-model="searchKeyword"></b-form-input>

					<b-button @click="showCart = true" class="ml-5"
					          variant="primary">
						<b-icon icon="inbox-fill"></b-icon>
						Cart
					</b-button>

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
						<b-button-group>
							<b-button
								@click="removeitem(data.item)"
								variant="danger">
								<b-icon icon="trash"></b-icon>
							</b-button>
							<b-button
								@click.once="addToCartModal(data.item)"
								variant="success">
								<b-icon icon="plus"></b-icon>
							</b-button>

						</b-button-group>
					</template>

				</b-table>

				<div class="d-flex justify-content-center mt-3">
					<b-pagination
						:per-page="perPage"
						:total-rows="rows"
						aria-controls="itemsTable"
						pills
						v-model="currentPage"
					></b-pagination>
				</div>
			</div>
		</b-overlay>

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
			<b-form @submit.prevent="editProduct">
				<b-form-group>
					<b-form-input
						id="name"
						placeholder="+ User Name"
						type="text"
						v-model="product.name"
					></b-form-input>
				</b-form-group>


				<b-form-group>
					<v-select :options="categories" :reduce="cat =>
						cat.text" label="text" v-model="product.category"></v-select>
				</b-form-group>


				<b-form-group>
					<label for="quantity">Quantity</label>
					<b-form-spinbutton id="quantity" max="99999999" min="1"
					                   v-model="product.quantity">
					</b-form-spinbutton>
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


		<!--		cart Modal-->
		<b-modal :visible="showCart" cancel-disabled centered hide-footer
		         id="cart-modal"
		         ignore-enforce-focus-selector
		         no-close-on-backdrop
		         no-close-on-esc
		         no-enforce-focus
		         ok-disabled
		         title="Cart">

			<b-form-group>
				<v-select :options="users" :reduce="usr =>
						usr.name" label="name" v-model="buyingUser"></v-select>
			</b-form-group>

			<b-table
				:fields="['name','Quantity','Actions']"
				:items="cart"
				hover
				id="itemsTable"

				v-if="cart.length">

				<template v-slot:cell(quantity)="data">
					<b-form-spinbutton :max="data.item.max" id="quantity" min="1"
					                   v-model="data.item.quantity"></b-form-spinbutton>
				</template>

				<template v-slot:cell(actions)="data">
					<b-button
						@click="removeFromCart(data.item)"
						variant="danger">
						<b-icon icon="trash"></b-icon>
					</b-button>
				</template>
			</b-table>

			<h4 class="text-center mb-3" v-else>
				your cart is empty
			</h4>

			<p class="text-danger mt-4" v-if="!!feedback">{{feedback}}</p>

			<div class="d-flex flex-row-reverse">
				<b-button @click="checkout" class="mx-1" type="submit"
				          variant="primary">Submit
				</b-button>
				<b-button @click="showCart=false" class="mx-1"
				          variant="secondary">cancel
				</b-button>
			</div>

		</b-modal>

	</div>
</template>

<script>
  import db from '@/firebase/init'
  import slugify from 'slugify'

  export default {
    name: "AllItems",
    data() {
      return {
        perPage: 20,
        currentPage: 1,
        showOverlay: null,
        searchKeyword: '',
        dataArray: [],
        fields: [
          {key: 'name', label: 'Name', sortable: true},
          {key: 'category', label: 'Category', sortable: true},
          {key: 'quantity', label: 'Quantity', sortable: true},
          {key: 'actions', label: 'Action'},
        ],
        product: {},
        showModal: false,
        feedback: null,
        categories: [],
        users: [],
        cart: [],
        buyingUser: null,
        showCart: false,
        cartTempItem: {}
      }
    },
    methods: {
      rowClicked(u) {
        this.showModal = true;
        this.product.id = u.id;
        this.product.name = u.name;
        this.product.slug = u.slug;
        this.product.quantity = parseInt(u.quantity);
        this.product.category = u.category
      },
      editProduct() {
        if (this.product.name && this.product.quantity &&
          this.product.category) {
          // Slugify Name
          this.product.slug = slugify(this.product.name, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-#:@]/g,
            lower: true
          });

          db.collection("items").doc(this.product.id).update({
            name: this.product.name,
            slug: this.product.slug,
            quantity: this.product.quantity,
            category: this.product.category
          }).then(() => {
            this.showModal = false;
            this.$swal('Edited', 'You successfully edited', 'success')
          })
        } else {
          this.feedback = 'you must enter values'
        }
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
            this.showOverlay = true;
            // Delete doc from firestore
            db.collection('item').doc(item.id).delete()
              .then(() => {
                this.dataArray = this.dataArray.filter(i => {
                  return i.id !== item.id
                });
                this.$swal('Deleted', `You successfully deleted ${item.name}`,
                  'success');
                this.showOverlay = false
              })
          }
        })
      },
      addToCartModal(row) {
        this.cartTempItem.name = row.name,
          this.cartTempItem.category = row.category,
          this.cartTempItem.quantity = row.quantity,
          this.cartTempItem.slug = row.slug,
          this.cartTempItem.id = row.id

        this.cart.push({
          name: this.cartTempItem.name,
          quantity: 1,
          max: this.cartTempItem.quantity,
          actions: null,
          id: this.cartTempItem.id,
        })
      },
      removeFromCart(item) {
        console.log(item)
        this.cart = this.cart.filter(i => {
          return i.id !== item.id
        })

      },
      checkout() {
        if (this.buyingUser && this.cart.length > 0) {
          // edit each product in firebase

          this.cart.forEach(cart => {
            let oldQuantity = 0
            this.dataArray.forEach(data => {
              data.id === cart.id ? oldQuantity = data.quantity : ''
            })


            db.collection("items").doc(cart.id).update({
              quantity: (oldQuantity - cart.quantity),
            }).then(() => {
              // console.log('old quantity:' + oldQuantity + ' what was bought: ' + cart.quantity);
            })
          })

          // add to operations
          let t = ''
          this.cart.forEach(e => t += `${e.name} ( ${e.quantity} ) - `)
          db.collection('operations').add({
            content: `${this.buyingUser} bought ${t}`,
            timestamp: Date.now(),
            type: 'sell'
          }).then(() => {

          })

          // reset
          this.$swal('Buying Successfully', '', 'success')
          this.showCart = false
          this.feedback = null
          this.cart = []
        } else {
          this.feedback = 'check you inputs'
        }
      }
    },
    computed: {
      rows() {
        return this.dataArray.length
      },
      items() {
        // return this.dataArray
        return this.searchKeyword ? this.dataArray.filter(i =>
          i.name.includes(this.searchKeyword) ||
          i.category.includes(this.searchKeyword) ||
          i.quantity.toString().includes(this.searchKeyword))
          : this.dataArray
      }
    },
    created() {
      db.collection('items').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let item = {};
            item.name = doc.data().name;
            item.category = doc.data().category;
            item.quantity = doc.data().quantity;
            item.slug = doc.data().slug;
            item.id = doc.id;
            this.dataArray.push(item)
          })
        })
      db.collection('categories').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let cat = {};
            cat.value = doc.data().slug;
            cat.text = doc.data().name;
            cat.id = doc.id;
            this.categories.push(cat)
          })
        })
      db.collection('users').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let u = {};
            u.name = doc.data().name;
            u.money = doc.data().money;
            u.id = doc.id;
            this.users.push(u)
          })
        })
    }
  }
</script>

<style scoped>

</style>