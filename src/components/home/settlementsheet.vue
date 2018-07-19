<template>
	<footer class="clearfix">
		<el-tag
		  v-for="(orders,index) in $store.state.order.storageOrders" 
		  :key='index'
		  @close = "deletestorageorder(index)"
		  closable>
		  <a @click="openOrder(index)" class="pointer">
			  {{orders.name||'订单'+(index+1)}}
		  </a>
		</el-tag>
	</footer>
</template>
<script>
  	export default { //结算单
  		name:'settlementsheet',
	    data() {
	      return {
	      };
	    },
	    methods: {
	    	openOrder(index){
	    		let {orderList} = this.$store.state.order;
	    		let _this = this
	    		if(orderList.length){
	    			this.$confirm('此操作将清空当前购物车?', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          type: 'warning'
			        }).then(() => {
		        		_this.$store.commit('showstagingorder',{index})
			        });
	    		}else{
	        		_this.$store.commit('showstagingorder',{index})
	    		}
	    	},
	    	deletestorageorder(index){
	    		this.$store.commit('deletestagingorder',{index})
	    	}
	    },
	    mounted(){
	    }
  	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer{height: 52px;position: absolute;bottom:-52px;left: 0;width: 75%;padding: 10px 20px;}

</style>
