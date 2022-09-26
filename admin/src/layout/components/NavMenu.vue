<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group>
  <el-menu :default-active="currentRouter" active-text-color="#ffd04b" background-color="#545c64" text-color="#fff"
    class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose" @select="handleRouter"
    router>
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
</template>

<script  setup>
import { computed, onMounted, ref, watch } from 'vue';
import router from '../../router';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { routerStore } from '../../store/routerStore';

const state = routerStore();
// 当前路由导航
const currentRouter = computed(() => state.currentRoute.path);
const isCollapse = ref(false)
const handleOpen = (key, keyPath) => {
  // console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath)
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
