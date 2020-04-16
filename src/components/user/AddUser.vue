<template>
	<div class="add-user container pt-3">

		<div class="card shadow mt-3 bg-white">

			<b-overlay :show="showOverlay" rounded="sm">

				<div class="card-header">
					<h2>Add User</h2>
				</div>

				<div class="card-body ">

					<b-form @submit.prevent="addUser">
						<b-form-group>
							<b-form-input
								id="name"
								placeholder="+ User Name"
								type="text"
								v-model="userName"
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
								v-model="money"
							></b-form-input>
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
    name: "AddUser",
    data() {
      return {
        userName: null,
        money: 0,
        feedback: null,
        showOverlay: false,
        slug: null
      }
    },
    methods: {
      addUser() {
        if (this.userName) {

          // Slugify Name
          this.slug = slugify(this.userName, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-#:@]/g,
            lower: true
          })

          this.showOverlay = true
          db.collection('users').add({
            name: this.userName,
            money: this.money || 0,
            slug: this.slug
          }).then(() => {
            this.$swal('Success', `${this.userName} added successfully`, 'success')
            this.userName = null
            this.feedback = null
            this.showOverlay = false
          })
        } else {
          this.feedback = 'you must enter a value'
        }
      }
    }

  }
</script>

<style scoped>

</style>