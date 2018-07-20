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
				    <el-button slot="append" icon="el-icon-tickets" @click='dialognewpro=true'>新增商品</el-button>
				</el-input>
		  	</el-col>
		</el-row>
		<el-input ref='focusonly' :autofocus="true" class='visible' 
				@keyup.13.native="handdleSure"
		></el-input>
		<el-table
		    ref="multipleTable"
		    tooltip-effect="dark"
		    :data="this.$store.state.refer.archivesList"
		    border highlight-current-row
	     	@cell-click="changeProInfo"
		    size='small'
		    max-height='300'
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
			  <el-form-item label="商品名称" prop="name">
			    <el-input v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  <el-form-item label="商品名称" prop="id">
			    <el-input v-model="ruleForm.id"></el-input>
			  </el-form-item>
			  <el-form-item label="活动区域" prop="region">
			    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
			      <el-option label="区域一" value="shanghai"></el-option>
			      <el-option label="区域二" value="beijing"></el-option>
			    </el-select>
			  </el-form-item>
			  <el-form-item label="活动时间" required>
			    <el-col :span="11">
			      <el-form-item prop="date1">
			        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
			      </el-form-item>
			    </el-col>
			    <el-col class="line" :span="2">-</el-col>
			    <el-col :span="11">
			      <el-form-item prop="date2">
			        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
			      </el-form-item>
			    </el-col>
			  </el-form-item>
			  <el-form-item label="即时配送" prop="delivery">
			    <el-switch v-model="ruleForm.delivery"></el-switch>
			  </el-form-item>
			  <el-form-item label="活动性质" prop="type">
			    <el-checkbox-group v-model="ruleForm.type">
			      <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
			      <el-checkbox label="地推活动" name="type"></el-checkbox>
			      <el-checkbox label="线下主题活动" name="type"></el-checkbox>
			      <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
			    </el-checkbox-group>
			  </el-form-item>
			  <el-form-item label="特殊资源" prop="resource">
			    <el-radio-group v-model="ruleForm.resource">
			      <el-radio label="线上品牌商赞助"></el-radio>
			      <el-radio label="线下场地免费"></el-radio>
			    </el-radio-group>
			  </el-form-item>
			  <el-form-item label="活动形式" prop="desc">
			    <el-input type="textarea" v-model="ruleForm.desc"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
			    <el-button @click="resetForm('ruleForm')">重置</el-button>
			  </el-form-item>
			</el-form>
		</el-dialog>
	</header>
  </div>
</template>
<script>
  export default {
    data() {
      	return {
	      	productId:"",
	        dialognewpro:true,
	        ruleForm: {
	          name: '',
	          id:'',
	          region: '',
	          date1: '',
	          date2: '',
	          delivery: false,
	          type: [],
	          resource: '',
	          desc: ''
	        },
	        rules: {
	          name: [
	            { required: true, message: '请输入商品名称', trigger: 'blur' },
	            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
	          ],
	          id: [
	            { required: true, message: '请输入商品编码', trigger: 'blur' },
	            { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
	          ],
	          region: [
	            { required: true, message: '请选择活动区域', trigger: 'change' }
	          ],
	          date1: [
	            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
	          ],
	          date2: [
	            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
	          ],
	          type: [
	            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
	          ],
	          resource: [
	            { required: true, message: '请选择活动资源', trigger: 'change' }
	          ],
	          desc: [
	            { required: true, message: '请填写活动形式', trigger: 'blur' }
	          ]
	        }
      	};
    },
    methods: {
    	changeProInfo(){

    	},
    	newpro(){

    	},
      	submitForm(formName) {
	        this.$refs[formName].validate((valid) => {
	          if (valid) {
	            alert('submit!');
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
      	},
      	resetForm(formName) {
	        this.$refs[formName].resetFields();
      	}

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
