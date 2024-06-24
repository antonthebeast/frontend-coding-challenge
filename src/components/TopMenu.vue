<template>
    <el-menu
      class="mainmenu"
      mode="horizontal"
      :ellipsis="false"
      router
    >
      <el-menu-item index="/">Main</el-menu-item>
      <el-menu-item index="/winners">Winners</el-menu-item>
      <div class="flex-grow" />
    </el-menu>
  </template>
  
<script>
export default {
    name: "TopMenu",
}
</script>

<style>
.flex-grow {
    flex-grow: 1;
}
.mainmenu {
    width: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;    
}
</style>

