<template>
	<div class="div container pt-3">


		<div class="card shadow mt-3 bg-white">

			<b-overlay :show="showOverlay" rounded="sm">

				<div class="card-header">
					<h2>Add Category</h2>
				</div>

				<div class="card-body ">

					<b-form @submit.prevent="addItem">
						<b-form-group>
							<b-form-input
								id="name"
								placeholder="+ Category Name"
								type="text"
								v-model="categoryName"
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
    name: "AddCategory",
    data() {
      return {
        categoryName: null,
        feedback: null,
        showOverlay: false,
        slug: null
      }
    },
    methods: {
      addItem() {
        if (this.categoryName) {

          // Slugify Name
          this.slug = slugify(this.categoryName, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-#:@]/g,
            lower: true
          })


          this.showOverlay = true
          db.collection('categories').add({
            name: this.categoryName,
            slug: this.slug
          }).then(() => {
            this.categoryName = null
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