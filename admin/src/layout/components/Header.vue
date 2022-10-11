<template>
  <header class="header">
    <!-- xxx参照下图的格式 -->
    <div class="flex_row fl">
      <svg class="icon-big svg" aria-hidden="true" @click="setCollapse">
        <use :xlink:href="`#${icon}`"></use>
      </svg>
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
    </div>

    <el-dropdown class="fr dropdownContent">
      <span class="el-dropdown-link">
        <el-avatar :size="40" class="mr-3" :src="avaterUrl" />
        <h3 class="title">{{ state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </h3>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="outLogin">退出登录</el-dropdown-item>
          <el-dropdown-item @click="userInfo">用户信息</el-dropdown-item>
          <el-dropdown-item command="c">github</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </header>

  <UserDrawer ref="userDrawerRef"></UserDrawer>
</template>

<script setup>
import { localRemove } from '../../utils';
import { ref, computed } from 'vue';
import { userInfoStore } from '@/store/modules/userStore';
import router from '@/router/index';
import { routerStore } from '@/store/modules/routerStore';
import { munuStore } from '@/store/modules/munuStore';

const state = userInfoStore(); // 个人信息仓库
const routerArr = routerStore(); // 路由导航仓库
const munu = munuStore(); // 导航状态

const userDrawerRef = ref();
const isCollapse = ref(false);

// 当前路由导航
const currentRoute = computed(() => {
  return routerArr.currentRoute
})
// 父路由
const prontRouter = computed(() => {
  let current = currentRoute.value.path;
  let index = current.indexOf('/', 1);
  if (index > 0) {
    return routerArr.routes.find(item => item.path == current.slice(0, index));
  }
})
const avaterUrl = computed(() => {
  return import.meta.env.VITE_API_URL + state.user.avatar
})
// 放大或缩小导航栏
const icon = computed(() => {
  return isCollapse.value ? 'icon-fangda' : 'icon-suoxiao';
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
// 切换导航栏状态
const setCollapse = () => {
  isCollapse.value = !isCollapse.value;
  munu.setMunuStates()
}

// 退出登录
const outLogin = async () => {
  localRemove('token');
  // await getInfoApi()
  router.push('/login');
}

// 打开用户信息管理
const userInfo = () => {
  userDrawerRef.value.drawer = true;
}
// 对外暴露
defineExpose({
  isCollapse
})

</script>

<style lang="scss" scoped>
.header {
  padding-top: 5px;

  .dropdownContent {
    // text-align: center;

    .title {
      margin-top: 0px;
    }
  }

  .flex_row {
    display: flex;
  }
}

.item-title {
  font-size: 1.2rem;
  cursor: pointer;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>