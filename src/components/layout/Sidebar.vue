<template>
	<div class="sidebar">
		<b-sidebar bg-variant="dark" id="sidebar" shadow
		           text-variant="white" width="250px">
			<div class="sidebar-section">
				<div class="title" v-b-toggle.collapse-1>Inventory</div>
				<b-collapse class="" id="collapse-1" visible>
					<b-list-group class="list">
						<router-link :to="{name: 'AllItems'}" button
						             tag="b-list-group-item">
							<b-icon icon="inbox-fill"></b-icon>
							All Items
						</router-link>
						<router-link :to="{name: 'AddItem'}" button tag="b-list-group-item">
							<b-icon icon="plus"></b-icon>
							Add Item
						</router-link>
					</b-list-group>
				</b-collapse>

				<hr>

				<div class="title" v-b-toggle.collapse-2>Categories</div>
				<b-collapse class="" id="collapse-2" visible>
					<b-list-group class="list">
						<router-link :to="{name: 'AllCategories'}" button
						             tag="b-list-group-item">
							<b-icon icon="inbox-fill"></b-icon>
							All Categories
						</router-link>
						<router-link :to="{name: 'AddCategory'}" button
						             tag="b-list-group-item">
							<b-icon icon="plus"></b-icon>
							Add Category
						</router-link>
					</b-list-group>
				</b-collapse>
				<hr>

				<div class="title" v-b-toggle.collapse-3>Users</div>
				<b-collapse class="" id="collapse-3" visible>
					<b-list-group class="list">
						<router-link :to="{name: 'AllUsers'}" button
						             tag="b-list-group-item">
							<b-icon icon="person-fill"></b-icon>
							All Users
						</router-link>

						<router-link :to="{name: 'AddUser'}" button
						             tag="b-list-group-item">
							<b-icon icon="plus"></b-icon>
							Add User
						</router-link>
					</b-list-group>
				</b-collapse>

				<hr>

				<div class="title" v-b-toggle.collapse-4>Operations</div>
				<b-collapse class="" id="collapse-4" visible>
					<b-list-group class="list">
						<router-link :to="{name: 'AllOperations'}" button
						             tag="b-list-group-item">
							<b-icon icon="check-all"></b-icon>
							All Operations
						</router-link>

					</b-list-group>
				</b-collapse>
			</div>
		</b-sidebar>

		<div class="sidebar-overlay" v-b-toggle.sidebar></div>
	</div>
</template>

<script>
  export default {
    name: "Sidebar"
  }
</script>

<style scoped>

</style>