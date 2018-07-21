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
		<el-table
		    ref="multipleTable"
		    tooltip-effect="dark"
		    :data="$store.state.refer.archivesList"
		    border highlight-current-row
	     	@cell-click="changeProInfo"
		    size='small'
		    height='100%'
		    style="width: 100%">
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
	  	<el-dialog title="新增商品" :visible.sync="dialognewpro">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row :gutter="10">
					<el-col :span="12">
					  	<el-form-item label="商品名称" prop="name">
					    	<el-input v-model="ruleForm.name"></el-input>
					  	</el-form-item>
					</el-col>
					<el-col :span="12">
					  	<el-form-item label="商品编码" prop="id">
					    	<el-input v-model="ruleForm.id"></el-input>
					  	</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="8">
					  <el-form-item label="商品单价" prop="price">
					   <el-input-number v-model="ruleForm.price" :precision="2" :step="0.1" :min="0.01"></el-input-number>
					  </el-form-item>
					</el-col>
					<el-col :span="8">
					  <el-form-item label="团购数量" prop="groupNum">
					   <el-input-number v-model="ruleForm.groupNum" :precision="0" :step="1" :min="0"></el-input-number>
					  </el-form-item>
					</el-col>
					<el-col :span="8">
					  <el-form-item label="团购价" prop="groupPrice">
					   <el-input-number v-model="ruleForm.groupPrice" :precision="2" :step="0.1" :min="0"></el-input-number>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="8">
					  	<el-form-item label="商品分类" prop="category">
					  		<el-cascader
							    expand-trigger="hover"
							    :options="options"
							    v-model="ruleForm.category"
							    @change="handleChange">
					  		</el-cascader>
					  	</el-form-item>
					</el-col>
					<el-col :span="16">
					  <el-form-item label="商品描述" prop="desc">
					    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
					  </el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="10">
					<el-col :span="24">
					  	<el-form-item>
					    	<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
					    	<el-button @click="resetForm('ruleForm')">重置</el-button>
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
		        ruleForm: {
		          name: '',		// 商品名称
		          id:'',		// 商品ID
		          price:0,		// 产品单价
		          groupNum:4,	// 团购数量
		          groupPrice:0, // 团购价
		          category:'', 	// 商品分类
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
	    		let {data} = await getarchives()
	    		this.$store.state.refer.archivesList = data
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
	    	changeProInfo(row){
	    	 	Object.assign(this.ruleForm,row)
		        this.dialognewpro=true
	    	},
	    	newpro(){

	    	},
	      	submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            alert('submit!');
	        		this.$refs[formName].resetFields();
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
		        	this.ruleForm[v]=''
		        })
	      	}
	    },
	    mounted(){
	    	this.init()
	    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
