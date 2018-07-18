<template>
  <el-container>
    <el-aside :width="width">
      <div class="logo">
        <span>LOGO</span>  
      </div>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" router>
        <!--
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        -->
        <el-menu-item index="/home/archives">
          <i class="el-icon-menu"></i>
          <span slot="title">档案</span>
        </el-menu-item>
        <el-menu-item index="/home/order">
          <i class="el-icon-document"></i>
          <span slot="title">售货</span>
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-switch
          :value='!isCollapse'
          @change='changeSwitch'
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script> 
 export default {
    data() {
      return {
        isCollapse: true,
        width:'64px'
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      changeSwitch(){
        this.isCollapse=!this.isCollapse
        this.width= this.isCollapse ? '64px' : '200px'
      }
    }
  }
</script>
<style scoped>  
.logo{height: 60px;border-bottom: solid 1px #ccc;display: flex;align-items: center;justify-content: center;}
.el-header{background-color: #B3C0D1;color: #333;}
.el-aside{color: #333;}
.el-main{background-color: #f9f9f9;color: #333;}
#app>.el-container{height: 100%;overflow: hidden;}
.el-menu-vertical-demo:not(.el-menu--collapse){overflow:hidden;}
.comm-right{height: 52px;border: 1px solid #f0f0f0;color: #999;}
</style>
