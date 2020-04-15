<template>
	<div class="all-items container pt-3">
		<h1 class="page-title h3">All Items</h1>

		<input class="formcontrol" type="text" v-model="filterInput">
		<b-table
			:fields="fields"
			:items="items"
			bordered
			borderless
			filter
			hover
			outlined
			striped
		></b-table>

	</div>
</template>

<script>
  export default {
    name: "AllItems",
    data() {
      return {
        fields: ['first_name', 'last_name', 'age'],
        items: [
          {age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
          {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
          {age: 89, first_name: 'Geneva', last_name: 'Wilson'}
        ],
        filteredItems: [],
        filterInput: null
      }
    },
    methods: {
      filterItems() {
        this.items.filter(item => {
          return item.inclues(this.filterInput)
        })
      }
    }
  }
</script>

<style scoped>

</style>