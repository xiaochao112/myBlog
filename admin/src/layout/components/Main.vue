<template>
  <el-divider></el-divider>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>


</script>

<style lang="scss" scoped>

</style>