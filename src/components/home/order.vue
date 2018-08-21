<template>
	<div class="wait-container">
		<div class="order-container" ref='orders'>
			<refer></refer>
			<div class="order" :style="'height:'+orderheight+'px'">
				<el-row :gutter="10" class='order-list-title'>
				  	<el-col :span="1"><div class="text-center">序号</div></el-col>
				  	<el-col :span="2"><div>商品编码</div></el-col>
				  	<el-col :span="3"><div>商品名称</div></el-col>
				  	<el-col :span="2"><div>单品价格</div></el-col>
				  	<el-col :span="3"><div>数量</div></el-col>
				  	<el-col :span="2"><div>单品总价</div></el-col>
				  	<el-col :span="2"><div>已优惠</div></el-col>
				  	<el-col :span="6"><div>描述</div></el-col>
				  	<el-col :span="3"><div>操作</div></el-col>
				</el-row>
				<div class='order-list clearfix'>
					<el-row :gutter="10" v-for="(item, index) in $store.state.order.orderList"  :class="{ 'order-list-con':true, 'on':($store.state.order.index==index)}" :key='index' @click.native='changeIndex(index)'>
					  	<el-col :span="1"><div class="text-center">{{index+1}}</div></el-col>
					  	<el-col :span="2"><div>{{item.id}}</div></el-col>
					  	<el-col :span="3"><div>{{item.name}}</div></el-col>
				  		<el-col :span="2"><div>{{item.price}}</div></el-col>
					  	<el-col :span="3"><div>
				  		 	<el-input-number v-model="item.orderNum" size="medium" @change="value=>changeOrderNum(value,index)" :min="0" :max="100" label="描述文字"></el-input-number>
					  	</div></el-col>
					  	<el-col :span="2"><div>
					  		<el-input v-model="item.singletotalprice" type='number' size="medium" placeholder="单品总价" @change="value=>valuechange(value,index)"></el-input>
					  	</div></el-col>
					  	<el-col :span="2"><div>{{item.discounted ||'0.00'}}</div></el-col>
					  	<el-col :span="6"><div>{{item.desc}}</div></el-col>
					  	<el-col :span="3" class='text-center'>
							<el-button type="danger"  @click='deleteOrder(index)' plain size='mini'>移除</el-button>
					  	</el-col>
					</el-row>
				</div>
			</div>
		</div>
		<div class="receipt-container">
			<settlementsheet></settlementsheet>
	      	<div class="sum-price">
		        <p>
		          	<span>共</span><strong>{{computeOrder.goodsNum}} </strong><em>件商品</em>
		          	<span>商品总价 </span><strong>{{computeOrder.goodsPrice}} 元</strong>
		          	<a @click='showcountorder'>结算</a>
		        </p>
	       	</div>
		</div>
		<storage/>
		<el-dialog title="结算" :visible.sync="$store.state.order.dialogcountorder" close-on-press-escape>
			<div class="count-order">
				<el-row>
				  	<el-col :span="12">
				  		现金
				  	</el-col>
				  	<el-col :span="12">
					  支付宝
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						微信
					</el-col>
					<el-col :span="12">
						<el-button type="danger" @click='closecountorder'>取消</el-button>
					</el-col>
				</el-row>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import {mapGetters} from 'vuex';
	import refer from './refer'
	import storage from './storage'
	import settlementsheet from './settlementsheet'
  	export default {
	    data() {
	      return {
	      	orderheight:document.documentElement.clientHeight-180,
	      	fullHeight:document.documentElement.clientHeight
	      };
	    },
	    components:{
	    	refer,storage,settlementsheet
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
	          		that.orderheight = window.fullHeight-180
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
	      		this.$store.commit('CHANGEORDERNUMBER',{index,value})
	      	},
	      	handleResize (event) {
				this.fullHeight = document.documentElement.clientHeight
			},
			showcountorder(){
				this.$store.commit('togglecountorder',{show:true})
			},
			closecountorder(){
				this.$store.commit('togglecountorder',{show:false})
			},
			handlekeyup(event){
	    		let {index,orderList} = this.$store.state.order;
	    		let _value = orderList[index].orderNum;
				switch (event.keyCode){
					case 38:
    					index--
			    		if(index<0) {
			    			index=0 
			    			return false
			    		}
			    		if(index>orderList.length-1){
			    			index=orderList.length-1
			    			return false
			    		}	
			    		this.$store.commit('changeindex',{index})
					break;
					case 40:
    					index++
			    		if(index>orderList.length-1){
			    			index=orderList.length-1
			    			return false
			    		}	
			    		this.$store.commit('changeindex',{index})
					break;
					case 37:
					case 109:
			    		if(!orderList.length){
			    			return false
			    		}
			    		this.productId = ''
			      		this.$store.commit('CHANGEORDERNUMBER',{index:index,value:_value-1})
			        	this.$refs.barcode.$el.querySelector('input').focus();
					break;
					case 39:
					case 107:
			    		if(!orderList.length){
			    			return false
			    		}
			    		this.productId = ''
			      		this.$store.commit('CHANGEORDERNUMBER',{index:index,value:_value+1})
					break;
					default:
				}
			}
	    },
	    created(){
	    	document.body.addEventListener('keyup',this.handlekeyup,false)
	    },
	    beforeDestroy(){
	    	document.body.removeEventListener('keyup',this.handlekeyup,false)
	    }

 	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	header{height:48px;}
	.wait-container{height: 100%;position:relative;}
	.order{padding:0 10px;overflow:auto;}
	.order-list-title{
		height: 46px;line-height: 46px;background-color: #fafafa;font-size:14px;font-weight: bold;color: #333;border:#ccc solid 1px;min-width: 1200px;
	}
	.order-list-title>div:not(:last-child){border-right:solid 1px #ccc;}
	.order-list-con{height: 50px;line-height: 50px;background-color: #f1f1f1;border:#ccc solid 1px;font-size: 14px; border-top: none;min-width: 1200px;}
	.order-list-con>div:not(:last-child){border-right:solid 1px #ccc;}
	.order-list-con:hover,.order-list-con.on{background-color: #409EFF;color: #fff;font-weight: bold;}
	.operate{cursor: pointer}
	.order-container{width:75%;float: left;height: 100%;}
	.receipt-container{width:25%;float: left;height: 100%;position:relative;border:solid 1px red;padding-left: 20px;}
	.sum-price{font-size: 16px;line-height: 52px;height: 52px;background-color: #f0f0f0;position: absolute;left: 0;bottom:-52px;width: 100%;overflow: hidden;}
	.sum-price p{padding-left: 10px;font-size: 12px;color: #666;}
	.sum-price p em{margin-right:6px;font-style:normal;}
	.sum-price p strong{color: #e4393c;font-weight: bold; font-size:18px;padding-left: 6px;}
	.sum-price p a{display: inline-block; width: 96px; height: 52px; line-height: 52px; color: #fff; text-align: center; font-size: 18px;  background: #e54346; cursor: pointer; margin-left:20px;position: absolute;right: 0;}
</style>
