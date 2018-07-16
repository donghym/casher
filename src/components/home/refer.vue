<template>
	<header class="clearfix">
		<el-row :gutter="20">
	  		<el-col :span="2" :offset="16">
	  			<el-form ref="form" label-width="80px">
				  	<el-form-item label="合并商品">
				        <el-switch
				          	v-model='$store.state.mergeOrder'
				          	active-color="#13ce66"
				          	inactive-color="#ff4949">
				        </el-switch>
				 	</el-form-item>
			 	</el-form>
		  	</el-col>
	  		<el-col :span="6">
				<el-input 
					placeholder="请输入条形码" ref='barcode' v-model="productId"
					class="input-with-select" clearable  :autofocus="true"  
					@keyup.107.native="valueChange(true)"  @keyup.109.native="valueChange(false)"
					@keyup.13.native="productIdenter"
					>
				    <el-button slot="append" icon="el-icon-tickets" @click="showArchives"></el-button>
				</el-input>
		  	</el-col>
		</el-row>
		<el-dialog title="档案列表" :visible.sync="$store.state.refer.archivesShow">
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
	      	archivesCurrent:[]
	      };
	    },
	    methods: {
	    	async init(){
	    		let {data} = await getarchives()
	    		this.$store.state.refer.archivesList = data
	    	},
	    	valueChange(state){
	    		let {index,orderList} = this.$store.state.refer
	    		if(!orderList.length){
	    			return false
	    		}
	    		let productId = this.productId;
	    		this.productId =productId.substring(0,productId.Length-1)
	    		let _value = state ? orderList[index].orderNum+1 : orderList[index].orderNum-1 
	      		this.$store.refer.dispatch('changeGoodsNum',{index:index,value:_value})
	    	},
	    	productIdenter(){
	    		const isNum = (num)=> /^\d+$/.test(num)
	    		const isMultiplication = (num) => /^\*(\d+)$/.test(num)
	    		let productId = this.productId
	    		if(isNum(productId)){
	    			// 正常的条形码
	    		}else if(isMultiplication(this.productId)){
		    		let {index,orderList} = this.$store.state.refer
		    		if(!orderList.length){
		    			return false
		    		}
		    		let _value = this.productId;
		    		_value=_value.substr(1,_value.length-1);
		      		this.$store.refer.dispatch('changeGoodsNum',{index:index,value:Number(_value)})
	    		}else{
	    		}
    			this.productId=null
	    	},
	    	showArchives(){
	    		this.$store.state.refer.archivesShow=true
	    	},
	      	handleSelectionChange(val) {
	        	this.archivesCurrent = val;
	      	},
	      	changeSelectIndex(row){
      		 	this.$refs.multipleTable.toggleRowSelection(row);
	      	},
	      	handdleSure(){
	      		let {orderList,index} = this.$store.state.order;
	      		debugger
		      	if(this.archivesCurrent.length){
			        this.$message({
			          message: '请选择商品',
			          type: 'warning'
			        });
			        return false
		      	}
		      	this.archivesCurrent.map(v=>{
		      		v.orderNum=1
		      		v.SingleTotalPrice=v.price
		      		return v
		      	})
		      	orderList = orderList.concat(this.archivesCurrent)
		      	this.$store.state.refer.orderList=orderList
        	 	this.$store.state.refer.index= orderList.length-1
	        	this.$refs.barcode.$el.querySelector('input').focus();
	      		this.handdleCancel()
	     	},
	      	handdleCancel(){
	      		const {refer} = this.$store.state
	      		refer.archivesShow = false
				this.$refs.multipleTable.clearSelection();
	      	}
	    },
	    mounted(){
	    	this.init()
	    }
  	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	header{height:48px;overflow: hidden;}
	.el-dialog__body{padding: 0 10px 10px}
	.el-table__body tr.current-row>td{background-color: #ff00ff;}
	.page{padding-bottom: 10px;}
	.dialog-footer{text-align: right}
	.el-table__body tr.current-row>td{background-color: #ccc;}
	.el-table__expanded-cell[class*=cell]{padding: 8px;}
</style>
