<template>
	<div class="settlement-sheet">
	  	<el-table
		    :data="$store.state.order.orderList"
		    height='100%'
		    stripe
		    style="width: 100%">
		    <el-table-column
		      label="商品名称"
		      prop="name">
		    </el-table-column>
		    <el-table-column
		      label="单价"
		      prop="price">
		    </el-table-column>
		    <el-table-column
		      label="数量"
		      prop="orderNum">
		    </el-table-column>
		    <el-table-column
		      label="单品总价"
		      prop="singletotalprice">
		    </el-table-column>
	  	</el-table>
	</div>
</template>
<script>
  	export default { //结算单
  		name:'settlementsheet',
	    data() {
	    },
	    methods: {
	    },
	    mounted(){
	    }
  	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.settlement-sheet{overflow-x: hidden;height: 100%;}
</style>
