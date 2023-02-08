<template>
  <el-menu
    :default-active="currentRouter"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    class="el-menu-vertical-demo"
    :collapse="munu.munuStates"
    @open="handleOpen"
    @close="handleClose"
    @select="handleRouter"
    router
  >
    <template v-for="item in state.routes" :key="item.path">
      <el-sub-menu v-if="item.children.length > 1" :index="item.path">
        <template #title>
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#${item.meta['icon']}`"></use>
          </svg>
          <span>{{ item.meta['title'] }}</span>
        </template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.path"
          :index="child.path"
        >
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#${child.meta['icon']}`"></use>
          </svg>
          {{ child.meta['title'] }}
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="item.children[0].path">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="`#${item.children[0].meta['icon']}`"></use>
        </svg>
        <template #title>{{ item.children[0].meta['title'] }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script  setup>
import { computed, onMounted, ref } from 'vue'
import { routerStore } from '@/store/modules/routerStore'
import { munuStore } from '@/store/modules/munuStore'

const munu = munuStore()

const state = routerStore()
// 当前路由导航
const currentRouter = computed(() => state.currentRoute.path)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath)
}

// 获取当前选中的导航菜单
const handleRouter = (index) => {}
onMounted(() => {
  console.log(111111111)
  console.log(state.router)
})
</script>

<style>
.el-menu {
  height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
  position: fixed;
  z-index: 999;
}
</style>
<style lang="scss" scoped>
.icon {
  cursor: pointer;
}
</style>
