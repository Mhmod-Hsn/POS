<template>
	<div class="all-items container pt-3">
		<h1 class="page-title h3">All Items</h1>
		<!--
				<input class="formcontrol" type="text" v-model="filterInput">
				<b-table
					:fields="fields"
					:items="items"
					bordered
					borderless
					hover
					outlined
					striped
				></b-table>-->

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
			</b-table>
		</div>


	</div>
</template>

<script>
  export default {
    name: "AllItems",
    data() {
      return {
        searchKeyword: '',
        dataArray: [
          {name: 'John', category: 'Doe', quantity: 25},
          {name: 'Jane', category: 'Doe', quantity: 25},
          {name: 'John', category: 'Doo', quantity: 25},
          {name: 'Jane', category: 'Doo', quantity: 25}
        ],
        fields: [
          {key: 'name', label: 'Name', sortable: true},
          {key: 'category', label: 'Category', sortable: true},
          {key: 'quantity', label: 'Quantity', sortable: true}
        ]
      }
    },
    methods: {
      rowClicked(event) {
        console.log(event.name)
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
    }
  }
</script>

<style scoped>

</style>