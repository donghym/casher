<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html,body,#app{
  height: 100%;
  width: 100%;
}
*{padding: 0;margin: 0;box-sizing: border-box;}
a{text-decoration: none;}
.text-center{text-align: center}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-input-number{width: 135px;}
</style>
