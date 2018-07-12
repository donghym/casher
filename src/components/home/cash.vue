<template>
	<div>
		<refer></refer>
		<div class="order">
			<el-row :gutter="20" class='order-list-title'>
			  	<el-col :span="3"><div>商品编码</div></el-col>
			  	<el-col :span="5"><div>商品名称</div></el-col>
			  	<el-col :span="4"><div>数量</div></el-col>
			  	<el-col :span="3"><div>单品总价</div></el-col>
			  	<el-col :span="6"><div>描述</div></el-col>
			  	<el-col :span="3"><div>操作</div></el-col>
			</el-row>
			<div class='order-list'>
				<el-row :gutter="20" v-for="(item, index) in $store.state.orderList" class='order-list-con' :key='index'>
				  	<el-col :span="3"><div>{{item.id}}</div></el-col>
				  	<el-col :span="5"><div>{{item.name}}</div></el-col>
				  	<el-col :span="4"><div>
			  		 	<el-input-number v-model="item.orderNum" size="medium" @change="value=>handleChange(value,index)" :min="0" :max="100" label="描述文字"></el-input-number>
				  	</div></el-col>
				  	<el-col :span="3"><div>
				  		<el-input :value="item.SingleTotalPrice" type='number' size="medium" placeholder="单品总价" @change="value=>valuechange(value,index)"></el-input>
				  	</div></el-col>
				  	<el-col :span="6"><div>{{item.desc}}</div></el-col>
				  	<el-col :span="3"><div @click='deleteRow(index)' class="operate">移除</div></el-col>
				</el-row>
			</div>
		</div>
		<div>商品数量：{{computeOrder.goodsNum}} 商品总价：{{computeOrder.goodsPrice}}</div>
	</div>
</template>
<script>
	import refer from './refer'
	import {mapGetters,mapActions} from 'vuex';
  	export default {
	    data() {
	      return {
	      	sellcurrentRow:'',//订单列表
	        orderData:[], // 订单
	      	currentMapRow:'', //选中的行
	        archivesData: [], // 商品
	        tips:false
	      };
	    },
	    components:{
	    	refer
	    },
	    computed:{
    	  	...mapGetters([
		      	"computeOrder"
	    	]),
    	 	...mapActions ([
    	 		"changeGoodsNum"
    	 	]),
	    },
	    methods: {
	      	deleteRow(index) {
	        	this.$store.state.orderList.splice(index, 1);
	      	},
	      	valuechange(value,index){
	      		let {orderList} = this.$store.state;
	      		orderList[index].SingleTotalPrice=Number(value)
	      	},
	      	handleChange(value,index){
	      		this.$store.dispatch('changeGoodsNum',{index:index,value:value})
	      	}
	    }
 	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	header{height:48px;}
	.order-list-title{
		height: 46px;line-height: 46px;background-color: #fafafa;font-size:14px;font-weight: bold;color: #333;border:#ccc solid 1px;
	}
	.order-list-title>div:not(:last-child){border-right:solid 1px #ccc;}
	.order-list-con{height: 50px;line-height: 50px;background-color: #f1f1f1;border:#ccc solid 1px;font-size: 14px; border-top: none;}
	.order-list-con>div:not(:last-child){border-right:solid 1px #ccc;}
	.order-list-con:hover{background-color: #409EFF;color: #fff;font-weight: bold;}
	.operate{cursor: pointer}
</style>
