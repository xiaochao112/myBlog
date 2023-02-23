<template>
  <div>
    <el-divider></el-divider>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="cacheRouter">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import cacheRouter from '@/router/modules/cacheRouter'
import { onMounted } from 'vue'
</script>

<style lang="scss" scoped>
/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.2s;
  // position: relative;
}

.fade-transform-enter-from {
  // opacity: 0;
  // transition: all 10s;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  /* transition: all 0.2s; */
  transform: translateX(30px);
}
</style>