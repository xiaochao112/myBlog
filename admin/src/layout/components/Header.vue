<template>
  <header class="header">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="40" class="mr-3" :src="state.user.avatar" />
        <h3 class="title">admin
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
import { ElMessage } from 'element-plus'
import { localRemove } from '../../utils';
import { ref, reactive } from 'vue';
import { getInfoApi } from '../../api/user';
import { userInfoStore } from '@/store/userStore';

const state = userInfoStore();

const userDrawerRef = ref();
// 退出登录
const outLogin = async () => {
  localRemove('token');
  await getInfoApi()
}
// 打开用户信息管理
const userInfo = () => {
  userDrawerRef.value.drawer = true;
}

</script>

<style lang="scss" scoped>
.header {
  float: right;
  margin-right: 20px;
  text-align: center;

  .title {
    // position: absolute;
    // top: 40px;
    // width: 60px;
    margin-top: 0px;
    margin-left: 20px;
  }
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>