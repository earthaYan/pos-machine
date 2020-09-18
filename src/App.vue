<template>
  <div id="app">
    <div class="left-nav">
      <left-nav></left-nav>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import leftNav from "@/components/leftNav";

export default {
  components: {
    leftNav,
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  display: flex;
}
.left-nav{
  width: 5%;
  height: 100%;
}
.main{
  width:95%; 
  background-color: #EFF2F7;
  height:100%;
  overflow: auto;
}
</style>
