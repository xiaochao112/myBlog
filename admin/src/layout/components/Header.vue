<template>
  <header class="header">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar :size="40" class="mr-3" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
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

  <!-- 修改密码 -->
  <!-- <el-dialog v-model="dialogFormVisible" title="Shipping address">
    <el-form :model="form">
      <el-form-item prop="password">
        <el-input :prefix-icon="Lock" v-model="form.password" placeholder="密码" type="password" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog> -->
  <UserDrawer ref="userDrawerRef"></UserDrawer>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { localRemove } from '../../utils';
import { ref, reactive } from 'vue';
import { getInfoApi } from '../../api/user';

const userDrawerRef = ref();
const form = reactive({
  password: '',
})

const outLogin = async () => {
  localRemove('token');
  await getInfoApi()
}

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