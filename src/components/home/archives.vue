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
					   <el-input-number v-model="ruleForm.price" size="medium" :precision="2" :step="0.1" :min="0.01"></el-input-number>
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
  	export default {
    	data() {
	      	return {
		      	productId:"",
		        dialognewpro:false,
		        currentindex:0,
		        priceindex:0,
		        groupNumindex:0,
		        groupPriceindex:0,
		        ruleForm: {
		          name: '',		// 商品名称
		          id:'',		// 商品ID
		          price:0,		// 产品单价
		          groupNum:4,	// 团购数量
		          groupPrice:0, // 团购价
		          category:[], 	// 商品分类
		          desc: ''		// 商品描述
		        },
		        rules: {
		          name: [
		            { required: true, message: '请输入商品名称', trigger: 'blur' },
		            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
		          ],
		          id: [
		            { required: true, message: '请输入商品编码', trigger: 'blur' },
		            { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
		          ],
		          price:[
		            { required: true, message: '请输入商品单价', trigger: 'blur' }
		          ],
		          category:[
		            { required: true, message: '请选择商品分类', trigger: 'change' }
		          ],
		        },
		         options: [
		         {
			          value: 'zhinan',
			          label: '指南',
			          children: [{
			            value: 'shejiyuanze',
			            label: '设计原则',
			            children: [{
			              value: 'yizhi',
			              label: '一致'
			            }, {
			              value: 'fankui',
			              label: '反馈'
			            }, {
			              value: 'xiaolv',
			              label: '效率'
			            }, {
			              value: 'kekong',
			              label: '可控'
			            }]
			          }, {
			            value: 'daohang',
			            label: '导航',
			            children: [{
			              value: 'cexiangdaohang',
			              label: '侧向导航'
			            }, {
			              value: 'dingbudaohang',
			              label: '顶部导航'
			            }]
			          }]
			        }, {
			          value: 'zujian',
			          label: '组件',
			          children: [{
			            value: 'basic',
			            label: 'Basic',
			            children: [{
			              value: 'layout',
			              label: 'Layout 布局'
			            }, {
			              value: 'color',
			              label: 'Color 色彩'
			            }, {
			              value: 'typography',
			              label: 'Typography 字体'
			            }, {
			              value: 'icon',
			              label: 'Icon 图标'
			            }, {
			              value: 'button',
			              label: 'Button 按钮'
			            }]
			          }, {
			            value: 'form',
			            label: 'Form',
			            children: [{
			              value: 'radio',
			              label: 'Radio 单选框'
			            }, {
			              value: 'checkbox',
			              label: 'Checkbox 多选框'
			            }, {
			              value: 'input',
			              label: 'Input 输入框'
			            }, {
			              value: 'input-number',
			              label: 'InputNumber 计数器'
			            }, {
			              value: 'select',
			              label: 'Select 选择器'
			            }, {
			              value: 'cascader',
			              label: 'Cascader 级联选择器'
			            }, {
			              value: 'switch',
			              label: 'Switch 开关'
			            }, {
			              value: 'slider',
			              label: 'Slider 滑块'
			            }, {
			              value: 'time-picker',
			              label: 'TimePicker 时间选择器'
			            }, {
			              value: 'date-picker',
			              label: 'DatePicker 日期选择器'
			            }, {
			              value: 'datetime-picker',
			              label: 'DateTimePicker 日期时间选择器'
			            }, {
			              value: 'upload',
			              label: 'Upload 上传'
			            }, {
			              value: 'rate',
			              label: 'Rate 评分'
			            }, {
			              value: 'form',
			              label: 'Form 表单'
			            }]
			          }, {
			            value: 'data',
			            label: 'Data',
			            children: [{
			              value: 'table',
			              label: 'Table 表格'
			            }, {
			              value: 'tag',
			              label: 'Tag 标签'
			            }, {
			              value: 'progress',
			              label: 'Progress 进度条'
			            }, {
			              value: 'tree',
			              label: 'Tree 树形控件'
			            }, {
			              value: 'pagination',
			              label: 'Pagination 分页'
			            }, {
			              value: 'badge',
			              label: 'Badge 标记'
			            }]
			          }, {
			            value: 'notice',
			            label: 'Notice',
			            children: [{
			              value: 'alert',
			              label: 'Alert 警告'
			            }, {
			              value: 'loading',
			              label: 'Loading 加载'
			            }, {
			              value: 'message',
			              label: 'Message 消息提示'
			            }, {
			              value: 'message-box',
			              label: 'MessageBox 弹框'
			            }, {
			              value: 'notification',
			              label: 'Notification 通知'
			            }]
			          }, {
			            value: 'navigation',
			            label: 'Navigation',
			            children: [{
			              value: 'menu',
			              label: 'NavMenu 导航菜单'
			            }, {
			              value: 'tabs',
			              label: 'Tabs 标签页'
			            }, {
			              value: 'breadcrumb',
			              label: 'Breadcrumb 面包屑'
			            }, {
			              value: 'dropdown',
			              label: 'Dropdown 下拉菜单'
			            }, {
			              value: 'steps',
			              label: 'Steps 步骤条'
			            }]
			          }, {
			            value: 'others',
			            label: 'Others',
			            children: [{
			              value: 'dialog',
			              label: 'Dialog 对话框'
			            }, {
			              value: 'tooltip',
			              label: 'Tooltip 文字提示'
			            }, {
			              value: 'popover',
			              label: 'Popover 弹出框'
			            }, {
			              value: 'card',
			              label: 'Card 卡片'
			            }, {
			              value: 'carousel',
			              label: 'Carousel 走马灯'
			            }, {
			              value: 'collapse',
			              label: 'Collapse 折叠面板'
			            }]
			          }]
			        }, {
			          value: 'ziyuan',
			          label: '资源',
			          children: [{
			            value: 'axure',
			            label: 'Axure Components'
			          }, {
			            value: 'sketch',
			            label: 'Sketch Templates'
			          }, {
			            value: 'jiaohu',
			            label: '组件交互文档'
			          }]
			        }
			        ],
			        selectedOptions: [],
			        selectedOptions2: []
 
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
	    		this.ruleForm.id = this.productId
	    		this.productId=''
		        this.dialognewpro=true
	    	},
	      	handleChange(value) {
	        	console.log(value);
	      	},
	    	showProInfo(row,index){
	    	 	Object.assign(this.ruleForm,row)
		        this.dialognewpro = true
		        this.currentindex = index
	    	},
	    	newpro(){

	    	},
	      	submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
	      			this.$store.dispatch('CHANGEARCHIVESINFO',{value:this.ruleForm,index:this.currentindex})
		            this.resetForm(formName)
	        		this.dialognewpro=false
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
	      	},
	      	resetForm(formName) {
		        this.$refs[formName].resetFields();
		        Object.keys(this.ruleForm).forEach(v=>{
	        		this.ruleForm[v]= (v=='category'?[]:'')
		        	
		        })
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
	.archives-list-title{border-top:1px solid #CF6611;border-left:1px solid #CF6611;height: 36px;}
	.archives-list-title div{border-bottom:1px solid #CF6611;border-right:1px solid #CF6611;padding:6px 10px;}
	.archives-list>div{border-left:1px solid #CF6611;}
	.archives-list>div>div{border-bottom:1px solid #CF6611;padding: 0 6px;border-right:1px solid #CF6611;height:42px;line-height: 42px;}
</style>
