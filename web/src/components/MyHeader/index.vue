<template>
  <header class="header" :class="{ maxHeader: isWidth }">
    <div class="favicon">
      <img src="@/assets/favicon.ico" alt="" />
    </div>
    <nav ref="navRef">
      <li
        @click="navClickItem(index)"
        v-for="(item, index) in state.navRoutes"
        :key="index"
        class="navItemCode"
      >
        <p :class="{ activeClass: index === state.navItem }">
          {{ item.meta.name }}
        </p>
      </li>
      <div
        class="border_nav"
        :style="`transform: translate3d(${state.navOffsetLeft}px, 0, 0);`"
      ></div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, nextTick, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { routesStore } from '@/stores/routesStore'

const route = useRoute()
const router = useRouter()
const state = routesStore()

const isWidth = ref(true)
const navRef = ref()

// 导航路由集合
const navRouter = computed(() => {
  const routers = router.options.routes
  const routerArr: any[] = []
  routers.forEach((item) => {
    if (item.meta?.nav) {
      routerArr.push(item)
    }
  })
  return routerArr
})

// 点击导航跳转
function navClickItem(index: number) {
  // // 当前路由导航
  // navItem.value = index
  state.setCurrentRoute(state.navRoutes[index].path)
  // 路由跳转
  router.push(state.currentRoute)
}

// 监听当前导航变化
// watch(navItem, (newValue) => {

// })
// 监听路由
watch(route, (newValue) => {
  console.log(newValue.path)

  if (newValue.meta.nav) {
    state.setCurrentRoute(newValue.path)
  }
  state.navRoutes.forEach((item, index) => {
    if (item.path == state.currentRoute) {
      state.setCurrentNav({
        navItem: index,
        left: navRef.value.children[index].offsetLeft,
      })
    }
  })
})

onMounted(() => {
  state.setRoutes(navRouter.value)
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>