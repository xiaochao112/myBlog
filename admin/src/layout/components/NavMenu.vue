<template>
  <el-menu :default-active="currentRouter" active-text-color="#ffd04b" background-color="#545c64" text-color="#fff"
    class="el-menu-vertical-demo lFloat" :collapse="isCollapse" @open="handleOpen" @close="handleClose"
    @select="handleRouter" router>
    <template v-for="item in state.routes" :key="item.path">
      <el-sub-menu v-if="item.children.length > 1" :index="item.path">
        <template #title>
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="`#${item.meta['icon']}`"></use>
          </svg>
          <span>{{ item.meta['title'] }}</span>
        </template>
        <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
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
  <transition>
    <!-- xxx参照下图的格式 -->
    <svg class="icon-big" aria-hidden="true" @click="setCollapse">
      <use :xlink:href="`#${icon}`"></use>
    </svg>
  </transition>

</template>

<script  setup>
import { computed, onMounted, ref } from 'vue';
import { routerStore } from '../../store/routerStore';

const isCollapse = ref(false);
const emits = defineEmits(['getWidth'])

const state = routerStore();
// 当前路由导航
const currentRouter = computed(() => state.currentRoute.path);
const handleOpen = (key, keyPath) => {
  // console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath)
}
// 放大或缩小导航栏
const icon = computed(() => {
  return isCollapse.value ? 'icon-fangda' : 'icon-suoxiao';
})

// 切换导航栏状态
const setCollapse = () => {
  isCollapse.value = !isCollapse.value;
  if (isCollapse.value) {
    emits('getWidth', 100)
  } else {
    emits('getWidth', 236)
  }
}

// 获取当前选中的导航菜单
const handleRouter = (index) => { }
onMounted(() => {
})

</script>

<style>
.el-menu {
  border: none;
  height: 100%;
  overflow: hidden;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100%;
}
</style>
<style lang="scss" scoped>
.icon {
  cursor: pointer;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 1;
}
</style>
