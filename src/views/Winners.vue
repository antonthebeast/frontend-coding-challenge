<template>
    <top-menu></top-menu>
    <div class="winners-container">
      <h1>Winners</h1>
      <winners-list></winners-list>
    </div>
</template>
  
<script>
  import WinnersList from '@/components/WinnersList.vue'
  import TopMenu from '@/components/TopMenu.vue'
  
  export default {
    name: 'WinnersPage',
    components: {
      WinnersList,
      TopMenu
    }
  }
</script>
  
<style scoped>
 .winners-container {
  width: 50vw;
  display: grid;
  justify-items: center;
}
</style>
  