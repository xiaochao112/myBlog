<template>
  <el-card>
    <h2 class="title">{{ title.login }}页面</h2>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      class="demo-ruleForm"
    >
      <el-form-item prop="username">
        <el-input
          :prefix-icon="User"
          v-model="ruleForm.username"
          placeholder="管理员：admin"
          type="text"
          clearable
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :prefix-icon="Lock"
          v-model="ruleForm.password"
          placeholder="请输入密码"
          type="password"
          show-password
        />
      </el-form-item>
      <el-form-item prop="text">
        <div class="captcha">
          <el-input
            v-model="ruleForm.text"
            placeholder="输入验证码"
            type="text"
          />
          <img :src="base64Img" alt="" srcset="" @click="renovateCaptcha" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          class="btn"
          type="primary"
          size="large"
          @click="submitForm(ruleFormRef)"
        >
          登录
        </el-button>
        <el-button class="btn" size="large" @click="resetForm(ruleFormRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <p class="p_title">如果没有账号则自动注册为普通用户</p>
  </el-card>
</template>

<script setup>
import { reactive, ref, computed, onBeforeMount } from 'vue'
// el图标
import { User, Lock } from '@element-plus/icons-vue'
import { userInfoStore } from '@/store/modules/userStore'
import { getCaptcha } from '@/api/user'
import router from '@/router'

const store = userInfoStore()
const base64Img = ref('')
const currentText = ref('')
const title = reactive({
  login: '登录',
  register: '注册',
})
const ruleFormRef = ref()
const ruleForm = reactive({
  username: '',
  password: '',
  text: '',
})

const captchaText = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('验证码不能为空'))
  } else {
    if (ruleForm.text.toLowerCase() !== currentText.value) {
      captcha()
      callback(new Error('验证码错误！'))
    } else {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('captchaText', () => null)
      callback()
    }
  }
}

onBeforeMount(() => {
  captcha()
})
const rules = reactive({
  username: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
  text: [{ validator: captchaText, trigger: 'blur' }],

  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 4, max: 10, message: '长度不能小于4，不能大于10', trigger: 'blur' },
  ],
})
const captcha = async () => {
  let { data, text } = await getCaptcha()
  base64Img.value = data
  currentText.value = text.toLowerCase()
}
// 刷新验证码
const renovateCaptcha = () => {
  captcha()
}

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      store
        .setLongin(ruleForm)
        .then((data) => {
          router.push('/home/index')
        })
        .catch((err) => {})
    } else {
      console.log('error submit!')
      return false
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
  width: 100%;
  text-align: center;
  font-weight: 600;
  color: rgb(81, 81, 81);
}

.demo-ruleForm {
  width: 360px;
  height: 260px;

  .btn {
    width: 40%;
    height: 50px;

    &:nth-child(1) {
      margin-right: 15%;
    }
  }
}

.p_title {
  font-weight: 300;
  font-size: 0.5rem;
  color: rgb(137, 208, 255);
}
.captcha {
  display: flex;
}
.el-input {
  height: 50px;
}
</style>