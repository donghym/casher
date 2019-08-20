<template>
  	<div class="archives">
		<header class="clearfix">
			<el-row :gutter="20">
		  		<el-col :span="3" :offset="10">
			  	</el-col>
		  		<el-col :span="6">
					<el-input 
						placeholder="请输入条形码" ref='barcode' v-model="productId"
						class="input-with-select" clearable  :autofocus="true"  
						@keyup.13.native="newpro"
						@keyup.37.native="valueChange(false)"
						@keyup.38.native="keyup(38)"
						@keyup.39.native="valueChange(true)"
						@keyup.40.native="keyup(40)"
						@keyup.107.native="valueChange(true)"  
						@keyup.109.native="valueChange(false)"
						@keyup.110.native="deleteRow"
						@keyup.111.native="deleteRows"
						>
					    <el-button slot="append" icon="el-icon-tickets" @click='showNewPro'>新增商品</el-button>
					</el-input>
			  	</el-col>
			</el-row>
			<el-input ref='focusonly' :autofocus="true" class='visible' 
				@keyup.13.native="handdleSure"
			></el-input>
		</header>
		<div class="archives-list-container">
			<el-row class='archives-list-title'>
				<el-col :span='1' class='text-center'>序号</el-col>			
				<el-col :span='3'>商品ID</el-col>			
				<el-col :span='3'>商品名称</el-col>			
				<el-col :span='3'>单价</el-col>			
				<el-col :span='3'>团购数量</el-col>			
				<el-col :span='3'>团购价格</el-col>			
				<el-col :span='3'>商品分类</el-col>			
				<el-col :span='5'>商品描述</el-col>			
			</el-row>
			<div class="archives-list clearfix pointer">
				<el-row v-for='(val,index) in $store.state.refer.archivesList' :key='index' @click.stop.native='showProInfo(val,index)'>
					<el-col :span='1' class='text-center'>{{index+1}}</el-col>			
					<el-col :span='3'>{{val.id}}</el-col>			
					<el-col :span='3'>{{val.name}}</el-col>			
					<el-col :span='3' @click.stop.native='priceindex=index+1'>
						<el-input 
							v-model="val.price" size="small" 
							placeholder="请输入金额" 
							@change='changeinfo(val,index)' 
							@blur='priceindex=0'
							v-if='index+1==priceindex'></el-input>
						<span v-else>
							{{val.price}}
						</span>
					</el-col>			
					<el-col :span='3' @click.stop.native='groupNumindex = index+1'>
					   	<el-input-number 
						   v-model="val.groupNum" size="small"  
						   v-if='index+1==groupNumindex' :precision="0" :step="1" :min="2" 
						   @change='changeinfo(val,index)'
						   @blur='groupNumindex=0'
						   ></el-input-number>
						<span v-else>
							{{val.groupNum}}
						</span>
					</el-col>			
					<el-col :span='3' @click.stop.native='groupPriceindex = index+1'>
						<el-input 
							v-model="val.groupPrice" size="small" 
							placeholder="请输入金额" 
							@change='changeinfo(val,index)' 
							@blur='groupPriceindex=0'
							v-if='index+1==groupPriceindex'></el-input>
						<span v-else>
							{{val.groupPrice}}
						</span>
					</el-col>			
					<el-col :span='3'>{{val.category.join()}}</el-col>			
					<el-col :span='5'>{{val.desc}}</el-col>					
				</el-row>
			</div>
		</div>
	  	<el-dialog title="新增商品" :visible.sync="dialognewpro">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row>
					<el-col :span="12">
					  	<el-form-item label="商品名称" prop="name">
					    	<el-input v-model="ruleForm.name" size="medium"></el-input>
					  	</el-form-item>
					</el-col>
					<el-col :span="12">
					  	<el-form-item label="商品编码" prop="id">
					    	<el-input v-model="ruleForm.id" size="medium"></el-input>
					  	</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
					  	<el-form-item label="商品单价" prop="price">
					   		<el-input-number v-model="ruleForm.price" size="medium" :precision="2" :step="1" :min="0.01"></el-input-number>
					  	</el-form-item>
					</el-col>
					<el-col :span="12">
					  	<el-form-item label="团购数量" prop="groupNum">
					   		<el-input-number v-model="ruleForm.groupNum" size="medium" :precision="0" :step="1" :min="0"></el-input-number>
					  	</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
					  	<el-form-item label="商品分类" prop="category">
					  		<el-cascader
							    expand-trigger="hover"
							    :options="options"
							    v-model="ruleForm.category"
						     	size="medium"
							    @change="handleChange">
					  		</el-cascader>
					  	</el-form-item>
					</el-col>
					<el-col :span="12">
					  <el-form-item label="团购价" prop="groupPrice">
					   <el-input-number v-model="ruleForm.groupPrice" size="medium" :precision="2" :step="0.1" :min="0"></el-input-number>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="15">
					  <el-form-item label="商品描述" prop="desc">
					    <el-input type="textarea" size="medium" v-model="ruleForm.desc"></el-input>
					  </el-form-item>
					</el-col>
					<el-col :span="9">
					  	<el-form-item>
					    	<el-button type="primary" size="medium" @click="submitForm('ruleForm')">更改</el-button>
					    	<el-button size="medium" @click="resetForm('ruleForm')">重置</el-button>
					  	</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-dialog>
  	</div>
</template>
<script>
	import { getarchives } from '../../service/getdata.js'
	import goods_describe from './json/goods_describe.json'
	import goods_rules from './json/goods_rules.json'
  	export default {
    	data() {
	      	return {
			    "productId": "",
			    "dialognewpro": false,
			    "currentindex": 0,
			    "priceindex": 0,
			    "groupNumindex": 0,
			    "groupPriceindex": 0,
			    "ruleForm": {
			        "name": "",
			        "id": "",
			        "price": 0,
			        "groupNum": 4,
			        "groupPrice": 0,
			        "category": [],
			        "desc": ""
			    },
			    "rules":goods_rules,
			    "options": goods_describe,
			    "selectedOptions": [],
			    "selectedOptions2": []
			};
    	},
	    methods: {
	    	async init(){
	    		let archivesData = await getarchives()
	    		this.$store.state.refer.archivesList = archivesData
	    	},
	    	showNewPro(){
			 	this.$message({
		          	message: '需要先验证是不是已经录入了',
		          	type: 'warning'
		        });
		       	// 如果已有该商品档案 将该商品档案的信息调出
		       	// 如没有 走下面的逻辑
	    		this.ruleForm.id = this.productId
	    		this.productId = ''
		        this.dialognewpro = true
		       	this.resetForm(true);
	    	},
	      	handleChange(value) {
	        	console.log(value);
	      	},
	    	showProInfo(row,index){
	    		this.ruleForm = JSON.parse(JSON.stringify(row))
		        this.dialognewpro = true
		        this.currentindex = index
	    	},
	    	newpro(){

	    	},
	      	submitForm(formName) {
	      		let _this = this;
		        this.$refs[formName].validate((valid) => {
		          	if (valid) {
		      			_this.$store.dispatch('CHANGEARCHIVESINFO',{value:_this.ruleForm,index:_this.currentindex})
		        		this.dialognewpro = false
		          	} else {
			            console.error('error submit!!');
			            return false;
		          	}
		        });
	      	},
	      	resetForm(add) {
	      		if(!add){ //新增商品
			        this.$refs['ruleForm'].resetFields();
	      		}
		        Object.keys(this.ruleForm).forEach(v=>{
	        		this.ruleForm[v]= (v=='category'?[]:'')
		        })
	    		this.currentindex = -1;
	      	},
	      	changeinfo(value,index){
	      		this.$store.dispatch('CHANGEARCHIVESINFO',{value,index})
	      		this.priceindex = 0
	      	}
	    },
	    mounted(){
	    	this.init()
	    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.archives{height: 100%;overflow: hidden;}
	.archives-list-title{border-top:1px solid #FFCC00;border-left:1px solid #FFCC00;height: 36px;}
	.archives-list-title div{border-bottom:1px solid #FFCC00;border-right:1px solid #FFCC00;padding:6px 10px;}
	.archives-list>div{border-left:1px solid #FFCC00;}
	.archives-list>div>div{border-bottom:1px solid #FFCC00;padding: 0 6px;border-right:1px solid #FFCC00;height:42px;line-height: 42px;}
</style>
