<template>
	<div class="container pt-3 operations">

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
</template>

<script>
  export default {
    name: "AllOperations"
  }
</script>

<style scoped>

</style>