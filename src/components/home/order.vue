<template>
	<div>
		<refer></refer>
		<div class="order" :style="'height:'+orderheight+'px'">
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
				<el-row :gutter="20" v-for="(item, index) in $store.state.order.orderList"  :class="{ 'order-list-con':true, 'on':($store.state.order.index==index)}" :key='index' @click.native='changeIndex(index)'>
				  	<el-col :span="1"><div>{{index+1}}</div></el-col>
				  	<el-col :span="2"><div>{{item.id}}</div></el-col>
				  	<el-col :span="3"><div>{{item.name}}</div></el-col>
			  		<el-col :span="2"><div>{{item.price}}</div></el-col>
				  	<el-col :span="3"><div>
			  		 	<el-input-number v-model="item.orderNum" size="medium" @change="value=>changeOrderNum(value,index)" :min="0" :max="100" label="描述文字"></el-input-number>
				  	</div></el-col>
				  	<el-col :span="3"><div>
				  		<el-input v-model="item.singletotalprice" type='number' size="medium" placeholder="单品总价" @change="value=>valuechange(value,index)"></el-input>
				  	</div></el-col>
				  	<el-col :span="2"><div>{{item.discounted ||'0.00'}}</div></el-col>
				  	<el-col :span="5"><div>{{item.desc}}</div></el-col>
				  	<el-col :span="3" class='text-center'>
						<el-button type="warning"  @click='deleteOrder(index)' plain size='mini'>移除</el-button>
				  	</el-col>
				</el-row>
			</div>
		</div>
      	<div class="sum-price">
	        <p>
	          	<span>已选购</span><strong>{{computeOrder.goodsNum}} </strong><em>件商品</em>
	          	<span>商品总价：</span><strong>{{computeOrder.goodsPrice}} 元</strong>
	          	<a>结算</a>
	        </p>
       	</div>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex';
	import refer from './refer'
  	export default {
	    data() {
	      return {
	      	orderheight:document.documentElement.clientHeight-180,
	      	fullHeight:document.documentElement.clientHeight
	      };
	    },
	    components:{
	    	refer
	    },
	    computed:{
	        ...mapGetters([
	            "computeOrder"
	        ])
	    },
	    mounted() {
	      	const that = this
	      	window.onresize = () => {
	        	return (() => {
	          		window.fullHeight = document.documentElement.clientHeight
	          		that.fullHeight = window.fullHeight
	          		that.orderheight=window.fullHeight-180
	        	})()
	      	}
	    },
	     watch: {
      		fullHeight (val) {
        		if(!this.timer) {
	          		this.fullHeight = val
		          	this.timer = true
		          	let that = this
	      			setTimeout(function (){
        				that.timer = false
      				},400)
        		}
      		}
    	},
	    methods: {
	      	deleteOrder(index) {
	      		this.$store.commit('deleteorder',{index})
	      	},
	      	valuechange(value,index){
	      		this.$store.commit('changeSingleTotalPrice',{value,index})
	      	},
	      	changeIndex(index){
	      		this.$store.state.order.index=index
	      	},
	      	changeOrderNum(value,index){
	      		// debugger
	      		this.$store.commit('CHANGEORDERNUMBER',{index,value})
	      	},
	      	handleResize (event) {
				this.fullHeight = document.documentElement.clientHeight
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
	.sum-price{font-size: 16px;line-height: 52px;height: 52px;background-color: #f0f0f0;position: fixed;left: 0;bottom: 0;width: 100%;}
	.sum-price p{text-align: right;}
	.sum-price p span{color: #333}
	.sum-price p em{color: #333;margin-right: 40px;font-style:normal;}
	.sum-price p strong{color: #e4393c;font-weight: bolder; font-size:22px;margin: 0 6px;}
	.sum-price p a{display: inline-block; width: 96px; height: 52px; line-height: 52px; color: #fff; text-align: center; font-size: 18px;  background: #e54346; cursor: pointer; margin-left:20px;}
	.order{overflow-x: hidden;padding:0 10px;}
</style>
