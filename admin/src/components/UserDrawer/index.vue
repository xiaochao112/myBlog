<template>
  <el-drawer v-model="drawer" title="" size="20%">
    <el-descriptions title="用户信息" :column="2">
      <el-descriptions-item label="用户名">
        <el-tag size="small">{{ user.username }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="手机号">
        <el-tag size="small">18100000000</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="权限">
        <el-tag size="small">{{ user.roles[0] }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="注册时间">
        <el-tag size="small">{{ getData(user.creationTime) }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="最后登录时间">
        <el-tag size="small">{{ getData(user.endLoginTime) }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <p>头像上传</p>
    <el-upload class="avatar-uploader" action="http://localhost:3000/admin/api/upload/picture" :show-file-list="false"
      :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
    <el-form :model="ruleFormRef" label-position="top" :rules="rules" class="demo-ruleForm" status-icon>
      <el-form-item label="新密码：" prop="password">
        <el-input v-model="ruleFormRef.password" placeholder="新密码" type="password" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">确认</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { localGet } from '../../utils';
import { updatedPsd } from '@/api/user'
// import { mavonEditor } from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
import { userInfoStore } from '@/store/userStore';
import { getData } from '../../utils';

const store = userInfoStore();

const drawer = ref(false)

const ruleFormRef = reactive({
  password: '',
})

const imageUrl = ref('')

const rules = reactive({
  password: [
    { required: true, message: '不能为空', trigger: 'blur' },
    { min: 4, max: 10, message: '长度为4~10', trigger: 'blur' },
  ],
})

// 用户信息
const user = computed(() => store.user)

// 头像上传
const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}
const beforeAvatarUpload = (rawFile) => {
  console.log(rawFile);

  if (rawFile.type !== 'image/jpeg') {
    // ElMessage.error('请上传jpg类型的图片')
    // return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('上传文件不能大于2M')
    return false
  }
  return true
}

const submitForm = async () => {
  const _id = localGet('userInfoStore').user._id;
  const { password } = ruleFormRef;
  try {
    const { msg } = await updatedPsd({ _id, password });
    ElMessage({
      message: msg,
      type: 'success',
    })
    ruleFormRef.password = ''
  } catch (error) {
    ElMessage({
      message: error,
      type: 'error',
    })
    console.log(error);

  }
}

// 暴露给父组件使用
defineExpose({
  drawer
})
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  /* text-align: center; */
}

.el-form {
  margin-top: 20px;
}
</style>