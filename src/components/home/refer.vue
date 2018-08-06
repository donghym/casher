<template>
	<header class="clearfix">
		<el-row :gutter="20">
			<el-col :span="5">
			      <el-input placeholder="请输入姓名" v-model="storagename">
			      	<el-button type="primary" slot="append" @click="handdleStaging">暂存</el-button>
				  </el-input>
			</el-col>
	  		<el-col :span="3" :offset="10">
	  			<el-form ref="form" label-width="80px">
				  	<el-form-item label="合并商品">
				        <el-switch
				          	v-model='$store.state.order.mergeOrder'
				          	active-color="#13ce66"
				          	inactive-color="#ff4949"
				          	@change="changemarge"
				          	>
				        </el-switch>
				 	</el-form-item>
			 	</el-form>
		  	</el-col>
	  		<el-col :span="6">
				<el-input 
					placeholder="请输入条形码" ref='barcode' v-model="productId"
					class="input-with-select" clearable  :autofocus="true"  
					@keyup.13.native="productIdenter"
					@keyup.37.native="valueChange(false)"
					@keyup.38.native="keyup(38)"
					@keyup.39.native="valueChange(true)"
					@keyup.40.native="keyup(40)"
					@keyup.107.native="valueChange(true)"  
					@keyup.109.native="valueChange(false)"
					@keyup.110.native="deleteRow"
					@keyup.111.native="deleteRows"
					@keyup.enter.ctrl.native="count"
					>
				    <el-button slot="append" icon="el-icon-tickets" @click.native="showArchives"></el-button>
				</el-input>
		  	</el-col>
		</el-row>
		<el-dialog title="档案列表" :visible.sync="$store.state.refer.archivesShow" close-on-press-escape>
			<el-input ref='focusonly' :autofocus="true" class='visible' 
				@keyup.13.native="handdleSure"
			></el-input>
			<el-table
			    ref="multipleTable"
			    tooltip-effect="dark"
			    :data="this.$store.state.refer.archivesList"
			    border highlight-current-row
		     	@selection-change="handleSelectionChange"
		     	@cell-click="changeSelectIndex"
			    size='small'
			    max-height='300'
			    style="width: 100%">
			    <el-table-column
			     	fixed
			      	type="selection"
			      	 @keyup.enter.native='handdleSure'
			      	width="40">
			    </el-table-column>
			    <el-table-column
			      type="index">
			    </el-table-column>
			    <el-table-column
			      label="商品ID"
			      prop="id">
			    </el-table-column>
			    <el-table-column
			      label="商品名称"
			      prop="name">
			    </el-table-column>
			    <el-table-column
			      label="单价"
			      prop="price">
			    </el-table-column>
			    <el-table-column
			      label="团购数量"
			      prop="groupNum">
			    </el-table-column>
			    <el-table-column
			      label="团购价格"
			      prop="groupPrice">
			    </el-table-column>
			    <el-table-column
			      label="商品分类"
			      prop="category">
			    </el-table-column>
			    <el-table-column
			      label="商品描述"
			      prop="desc">
			    </el-table-column>
		  	</el-table>
			<div slot="footer" class="dialog-footer">
				<el-pagination
				  background
				  layout="prev, pager, next"
				  class="page"
				  :total="1000">
				</el-pagination>
		    	<el-button @click='handdleCancel'>取消</el-button>
			    <el-button type="primary" @click="handdleSure">确定</el-button>
			</div>
		</el-dialog>
	</header>
</template>
<script>
	import { getarchives } from '../../service/getdata.js'
  	export default {
  		name:'refer',
	    data() {
	      return {
	      	productId:'',  // 商品ID
	      	archivesCurrent:[],
	      	storagename:''
	      };
	    },
	    methods: {
	    	async init(){// 请求数据
	    		this.$store.dispatch('GETARCHIVESINFO')
	    	},
	    	deleteRow(){
	    		if(this.productId.length===1 || this.productId=='..'){
		    		this.productId = ''
		      		this.$store.commit('deleteorder')
	    		}else{
	    			return false
	    		}
	    	},
	    	deleteRows(){
	    		let {orderList} = this.$store.state.order
	    		this.productId = ''
	    		if(!orderList.length) return
	    		let _this = this;
    			this.$confirm('此操作将清空当前购物车?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		      		_this.$store.commit('deleteorders')
		        });
	    	},
	    	handdleStaging(){ //暂存订单
	    		let {orderList} = this.$store.state.order
	    		if(!orderList.length){
			        this.$message({
			          showClose: true,
			          message: '空购物车是不能暂存的',
			          type: 'warning'
			        });
	    			return false
	    		}
	    		this.$store.commit('stagingorders',{name:this.storagename})
	    		this.storagename = ''
	    	},
	    	valueChange(state){
	    		let {index,orderList} = this.$store.state.order
	    		if(!orderList.length){
	    			return false
	    		}
	    		this.productId = ''
	    		let _value = state ? orderList[index].orderNum+1 : orderList[index].orderNum-1 
	      		this.$store.commit('CHANGEORDERNUMBER',{index:index,value:_value})
	        	this.$refs.barcode.$el.querySelector('input').focus();
	    	},
	    	keyup(key){
	    		let {index,orderList} = this.$store.state.order
	    		if(key===38){
    				index--
    			}else if(key===40){
    				index++
    			}
	    		if(index<0) {
	    			index=0 
	    			return false
	    		}
	    		if(index>orderList.length-1){
	    			index=orderList.length-1
	    			return false
	    		}	
	    		this.$store.commit('changeindex',{index})
	    	},
	    	count(){
	    		let {orderList} = this.$store.state.order
	    		if(!this.productId && orderList.length){
					this.$store.commit('togglecountorder',{show:true})
	    		}
	    	},
	    	changemarge(value){
	    		if(value){
	    			this.$store.commit('changemarge')
	    		}
	    	},
	    	productIdenter(){
	    		let productId = this.productId
	    		if(productId && productId[0]==='0' && productId.length>0){// 如果第一位是0
    				this.$store.commit('addorder',{ordernum:Number(ordernum)})
	    		}else if(isNum(productId)){ // 正常的条形码
	    			console.log('检测条码')
	    		}else if(isMultiplication(this.productId)){
		    		let {index,orderList} = this.$store.state.order
		    		if(!orderList.length){
		    			return false
		    		}
		    		let _value = this.productId;
		    		_value=_value.substr(1,_value.length-1);
		      		this.$store.commit('CHANGEORDERNUMBER',{index:index,value:Number(_value)})
	    		}else if(isadd(this.productId)){
	    			let ordernum = Number(this.productId.match(/\aa(\S*)/)[1])
	    			if(!ordernum){
	    				this.$message.error('请输入金额');
	    			}else{
	    				this.$store.commit('addorder',{ordernum:ordernum})
	    			}
	    		}
    			this.productId=null
	    	},
	    	showArchives(){
	    		this.$store.state.refer.archivesShow=true
	    	},
	      	handleSelectionChange(val) {
	        	this.archivesCurrent = val;
	        	this.focusonly()
	      	},
	      	changeSelectIndex(row){
      		 	this.$refs.multipleTable.toggleRowSelection(row);
	        	this.focusonly()
	      	},
	      	handdleSure(){
		      	if(!this.archivesCurrent.length){
			        this.$message({
			          message: '请选择商品',
			          type: 'warning'
			        });
			        return false
		      	}
		      	this.archivesCurrent.map(v=>{
		      		v.orderNum=1
		      		v.singletotalprice=v.price
		      		return v
		      	})
	    		this.$store.commit('ADDGOODSTOORDER',{orderList:JSON.parse(JSON.stringify(this.archivesCurrent))})
	      		this.handdleCancel()
	     	},
	      	handdleCancel(){
	      		const {refer} = this.$store.state
	      		refer.archivesShow = false
				this.$refs.multipleTable.clearSelection();
				this.focusonly()
	      	},
	      	focusonly(){
	      		 this.$nextTick(()=>{
		          this.$refs.focusonly.$el.querySelector('input').focus();
		        });
	      	},
	    },
	    mounted(){
	    	this.init()
	    }
  	}
	const isNum = (num)=> /^\d+$/.test(num)
	const isMultiplication = (num) => /^\*(\d+)$/.test(num)
	const isadd = (num)=>/aa/.test(num)
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	header{height:48px;overflow: hidden;padding:0 5px;}
	.el-dialog__body{padding: 0 10px 10px}
	.el-table__body tr.current-row>td{background-color: #ff00ff;}
	.page{padding-bottom: 10px;}
	.dialog-footer{text-align: right}
	.el-table__body tr.current-row>td{background-color: #ccc;}
	.el-table__expanded-cell[class*=cell]{padding: 8px;}
</style>
