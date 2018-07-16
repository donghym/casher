<template>
	<div>
		<refer></refer>
		<div class="order">
			<el-row :gutter="20" class='order-list-title'>
			  	<el-col :span="1"><div>序号</div></el-col>
			  	<el-col :span="2"><div>商品编码</div></el-col>
			  	<el-col :span="3"><div>商品名称</div></el-col>
			  	<el-col :span="2"><div>单品价格</div></el-col>
			  	<el-col :span="3"><div>数量</div></el-col>
			  	<el-col :span="3"><div>单品总价</div></el-col>
			  	<el-col :span="2"><div>已优惠</div></el-col>
			  	<el-col :span="5"><div>描述</div></el-col>
			  	<el-col :span="3"><div>操作</div></el-col>
			</el-row>
			<div class='order-list'>
				<el-row :gutter="20" v-for="(item, index) in $store.state.orderList"  :class="{ 'order-list-con':true, 'on':($store.state.index==index)}" :key='index' @click.native='changeIndex(index)'>
				  	<el-col :span="1"><div>{{index+1}}</div></el-col>
				  	<el-col :span="2"><div>{{item.id}}</div></el-col>
				  	<el-col :span="3"><div>{{item.name}}</div></el-col>
			  		<el-col :span="2"><div>{{item.price}}</div></el-col>
				  	<el-col :span="3"><div>
			  		 	<el-input-number v-model="item.orderNum" size="medium" @change="value=>handleChange(value,index)" :min="0" :max="100" label="描述文字"></el-input-number>
				  	</div></el-col>
				  	<el-col :span="3"><div>
				  		<el-input :value="item.SingleTotalPrice" type='number' size="medium" placeholder="单品总价" @change="value=>valuechange(value,index)"></el-input>
				  	</div></el-col>
				  	<el-col :span="2"><div>{{item.discounted ||'0.00'}}</div></el-col>
				  	<el-col :span="5"><div>{{item.desc}}</div></el-col>
				  	<el-col :span="3" class='text-center'>
						<el-button type="warning"  @click='deleteRow(index)' plain size='mini'>移除</el-button>
				  	</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>
<script>
	import refer from './refer'
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
	    methods: {
	      	deleteRow(index) {
	        	this.$store.state.refer.orderList.splice(index, 1);
	      	},
	      	valuechange(value,index){
	      		let {orderList} = this.$store.state.refer;
	      		orderList[index].SingleTotalPrice=Number(value)
	      	},
	      	changeIndex(index){
	      		this.$store.state.refer.index=index
	        	// this.$refs.barcode.$el.querySelector('input').focus();
	      	},
	      	handleChange(value,index){
	      		this.$store.refer.dispatch('changeGoodsNum',{index:index,value:value})
	      	},
	      	current(e){
	      		console.log(e)
	      		debugger
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
	.order-list-con:hover,.order-list-con.on{background-color: #409EFF;color: #fff;font-weight: bold;}
	.operate{cursor: pointer}
</style>
