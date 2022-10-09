<template>
  <!-- 面包屑 -->
  <el-page-header @back="onBack">
    <template #breadcrumb>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item @click="goHome" class="item-title">
          首页
        </el-breadcrumb-item>
        <template v-if="currentRoute.path != '/home/index'">
          <el-breadcrumb-item v-if="prontRouter.children.length > 1">{{ prontRouter.meta['title'] }}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `${currentRoute.path}` }">{{ currentRoute.meta['title'] }}
          </el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </template>
    <template #content>
      <span class="text-large font-600 mr-3">{{ currentRoute.meta['title'] }}</span>
    </template>
  </el-page-header>
  <el-divider></el-divider>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup>
import { computed } from 'vue';
import router from '../../router';
import { routerStore } from '../../store/routerStore';

const state = routerStore();
// 当前路由导航
const currentRoute = computed(() => {
  return state.currentRoute
})
// 父路由
const prontRouter = computed(() => {
  let current = currentRoute.value.path;
  let index = current.indexOf('/', 1);
  if (index > 0) {
    return state.routes.find(item => item.path == current.slice(0, index));
  }
})

// 返回首页
function goHome() {
  router.push('/home/index');
  state.setCurrentRoute('/home/index');
}

// 返回上一页
function onBack() {
  if (router.currentRoute.value.path == '/login') return
  router.go(-1);
}

</script>

<style lang="scss" scoped>
.item-title {
  font-size: 1.2rem;
  cursor: pointer;
}
</style>