<template>
	<footer class="clearfix">
		 <Tag color="magenta">magenta</Tag>
		<Tag closable @onClose="deletestorageorder" v-for="(orders,index) in $store.state.order.storageOrders">订单{{index+1}}</Tag>
	</footer>
</template>
<script>
  	export default {
  		name:'storage',
	    data() {
	      return {
	      };
	    },
	    methods: {
	    	deletestorageorder(index){
	    		// this.$store.commit('',{index})
	    	}
	    },
	    mounted(){
	    }
  	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
