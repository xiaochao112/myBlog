<template>
  <el-card>
    <h2 class="title">{{ title.login }}页面</h2>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
      <el-form-item prop="userName">
        <el-input :prefix-icon="User" v-model="ruleForm.userName" placeholder="姓名" type="text" clearable />
      </el-form-item>
      <el-form-item prop="password">
        <el-input :prefix-icon="Lock" v-model="ruleForm.password" placeholder="密码" type="password" show-password />
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" size="large" @click="submitForm(ruleFormRef)">登录</el-button>
        <el-button class="btn" size="large" @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <p class="p_title">如果没有账号则自动注册</p>
  </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue';
// el图标
import { User, Lock } from '@element-plus/icons-vue';

const title = reactive({
  login: '登录',
  register: '注册'
});
const ruleFormRef = ref();
const ruleForm = reactive({
  userName: '',
  checkPass: '',
})

const rules = reactive({
  userName: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' },
  { min: 4, max: 10, message: '长度不能小于4，不能大于10', trigger: 'blur' },],
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false;
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
.title {
  font-weight: 600;
  color: rgb(81, 81, 81);
}

.demo-ruleForm {
  width: 300px;
  height: 150px;

  .btn {
    width: 40%;

    &:nth-child(1) {
      margin-right: 15%;
    }
  }
}

.p_title {
  font-weight: 300;
  font-size: .5rem;
  color: rgb(137, 208, 255);
}
</style>