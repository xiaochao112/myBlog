<template>
  <el-menu :default-active="currentRouter" active-text-color="#ffd04b" background-color="#545c64" text-color="#fff"
    class="el-menu-vertical-demo lFloat" :collapse="isCollapse" @open="handleOpen" @close="handleClose"
    @select="handleRouter" route>
    <template v-for="item in state.routes" :key="item.path">
      <el-sub-menu v-if="item.children.length > 1" :index="item.path">
        <template #title>
          <el-icon>
            <icon-menu />
          </el-icon>
          <span>{{ item.meta['title'] }}</span>
        </template>
        <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
          <el-icon>
            <icon-menu />
          </el-icon>
          {{ child.meta['title'] }}
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="item.children[0].path">
        <el-icon>
          <icon-menu />
        </el-icon>
        <template #title>{{ item.children[0].meta['title'] }}</template>
      </el-menu-item>
    </template>

  </el-menu>
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px" class="lFloat">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group> -->
  <transition>
    <el-icon size="36px" class="icon" @click="setCollapse">
      <CirclePlusFilled v-show="isCollapse"></CirclePlusFilled>
      <icon-menu v-show="!isCollapse"></icon-menu>
    </el-icon>
  </transition>

</template>

<script  setup>
import { computed, onMounted, ref, watch } from 'vue';
import router from '../../router';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  CirclePlusFilled
} from '@element-plus/icons-vue'
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
const handleRouter = (index) => {
  console.log(index);
  state.setCurrentRoute(index)
}
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
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 1;
}
</style>
