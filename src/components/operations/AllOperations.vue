<template>
	<div class="container pt-3 operations">
		<h1>operations</h1>


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
			hover
			id="operationsTable">
		</b-table>
	</div>
</template>

<script>
  import db from '@/firebase/init'
  import moment from 'moment'

  export default {
    name: "AllOperations",
    data() {
      return {
        perPage: 20,
        currentPage: 1,
        searchKeyword: '',
        dataArray: [],
        fields: [
          {key: 'content', label: 'Content', sortable: true},
          {key: 'datetime', label: 'Time', sortable: true},
        ],
      }
    },
    computed: {
      rows() {
        return this.dataArray.length
      },
      items() {
        // return this.dataArray
        return this.searchKeyword ? this.dataArray.filter(i =>
            i.content.includes(this.searchKeyword))
          : this.dataArray
      }
    },
    created() {
      db.collection('operations').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            let item = {}
            item.id = doc.id
            item.content = doc.data().content
            item.timestamp = doc.data().timestamp
            item.datetime = moment(doc.data().timestamp).format('lll')
            this.dataArray.unshift(item)
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