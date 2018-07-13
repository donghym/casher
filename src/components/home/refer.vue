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
		<el-dialog title="档案列表" :visible.sync="$store.state.archivesShow">
			<el-table
			    ref="multipleTable"
			    tooltip-effect="dark"
			    :data="this.$store.state.archivesList"
			    border highlight-current-row
		     	@selection-change="handleSelectionChange"
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
			   <!--  <el-table-column type="expand">
			      <template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="商品名称">
							<span>{{ props.row.name}}</span>
						</el-form-item>
						<el-form-item label="商品 ID">
							<span>{{ props.row.id}}</span>
						</el-form-item>
						<el-form-item label="单价">
							<span>{{ props.row.price}}</span>
						</el-form-item>
						<el-form-item label="团购">
							<span>{{ props.row.groupPrice}}</span>
						</el-form-item>
						<el-form-item label="团购数量">
							<span>{{ props.row.groupNum }}</span>
						</el-form-item>
						<el-form-item label="商品分类">
							<span>{{ props.row.category }}</span>
						</el-form-item>
						<el-form-item label="店铺地址">
							<span>{{ props.row.address }}</span>
						</el-form-item>
						<el-form-item label="商品描述">
							<span>{{ props.row.desc }}</span>
						</el-form-item>
			        </el-form>
			      </template>
			    </el-table-column> -->
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
	      };
	    },
	    methods: {
	    	async init(){
	    		let {data} = await getarchives()
	    		this.$store.state.archivesList = data
	    	},
	    	valueChange(state){
	    		let {index,orderList} = this.$store.state
	    		if(!orderList.length){
	    			return false
	    		}
	    		let productId = this.productId;
	    		this.productId =productId.substring(0,productId.Length-1)
	    		let _value = state ? orderList[index].orderNum+1 : orderList[index].orderNum-1 
	      		this.$store.dispatch('changeGoodsNum',{index:index,value:_value})
	    	},
	    	productIdenter(){
	    		const isNum = (num)=> /^\d+$/.test(num)
	    		const isMultiplication = (num) => /^\*(\d+)$/.test(num)
	    		let productId = this.productId
	    		if(isNum(productId)){
	    			// 正常的条形码
	    		}else if(isMultiplication(this.productId)){
		    		let {index,orderList} = this.$store.state
		    		if(!orderList.length){
		    			return false
		    		}
		    		let _value = this.productId;
		    		_value=_value.substr(1,_value.length-1);
		      		this.$store.dispatch('changeGoodsNum',{index:index,value:Number(_value)})
	    		}else{
	    		}
    			this.productId=null
	    	},
	    	showArchives(){
	    		this.$store.state.archivesShow=true
	    	},
	      	handleSelectionChange(val) {
	        	this.$store.state.archivesCurrent = val;
	      	},
	      	handdleSure(){
	      		let {archivesCurrent,orderList,index} = this.$store.state;
		      	if(!archivesCurrent.length){
			        this.$message({
			          message: '请选择商品',
			          type: 'warning'
			        });
			        return false
		      	}
		      	archivesCurrent.map(v=>{
		      		v.orderNum=1
		      		v.SingleTotalPrice=v.price
		      		return v
		      	})
		      	orderList = orderList.concat(archivesCurrent)
		      	this.$store.state.orderList=orderList
        	 	this.$store.state.index= orderList.length-1
	        	this.$refs.barcode.$el.querySelector('input').focus();
	      		this.handdleCancel()
	     	},
	      	handdleCancel(){
	      		const {state} = this.$store
	      		state.archivesShow = false
	        	state.archivesCurrent = [];
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
