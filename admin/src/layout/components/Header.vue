<template>
  <header class="header">
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <el-avatar :size="40" class="mr-3" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <h3 class="title">admin <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </h3>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="outLogin">退出登录</el-dropdown-item>
          <el-dropdown-item command="b">修改密码</el-dropdown-item>
          <el-dropdown-item command="c">github</el-dropdown-item>
          <el-dropdown-item command="d" disabled>Action 4</el-dropdown-item>
          <el-dropdown-item command="e" divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </header>

</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'
import { localRemove } from '../../utils';

const handleCommand = (command) => {
  ElMessage(`click on item ${command}`)
  if (command = 'outLogin') {
    localRemove('token');
  }
}
</script>

<style lang="scss" scoped>
.header {
  float: right;
  margin-right: 20px;

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