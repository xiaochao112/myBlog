<template>
  <el-drawer v-model="drawer" title="" size="20%">
    <el-descriptions title="用户信息" :column="2">
      <el-descriptions-item>
        <el-avatar :size="40" class="mr-3" :src="avaterUrl" />
      </el-descriptions-item>
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
    <el-upload class="avatar-uploader" ref="addUpload" action :show-file-list="false" :headers="getAuthHeaders()"
      :before-upload="handleUpload">
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

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { updatedPsd } from '@/api/user';
// import { mavonEditor } from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'
import { userInfoStore } from '@/store/modules/userStore';
import { getData, localGet, localRemove } from '../../utils';
import { updatedAvatar } from '../../api/user';
import { uploadImg } from '../../api/upload';
import router from '@/router/index'


const store = userInfoStore();

const addUpload = ref();
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

// 请求头配置
const getAuthHeaders = () => {
  return {
    'token': localGet('token')
  }
}
// 用户头像路径地址
const avaterUrl = computed(() => {
  return import.meta.env.VITE_API_URL + store.user.avatar;
})

// 头像上传
const handleUpload = (file) => {
  if (file) {
    if (file.size > 500 * 1024) {
      ElMessage({
        message: '图片尺寸太大',
        type: 'error',
      })
      addUpload.value.clearFiles();
    } else {
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = () => {
      //   const _base64 = reader.result;
      //   imageUrl.value = _base64; //将_base64赋值给图片的src，实现图片预览
      // };
      let formData = new FormData();
      formData.append("avatar", file);
      uploadImg(formData)
        .then((res) => {
          if (res.code = 200) {
            updatedAvatar({ _id: user.value._id, avatar: res.imgUrl }).then(res => {
              ElMessage({
                message: "上传成功",
                type: 'success',
              })
            });
            // 重新获取用户信息
            store.setUser()
          } else {
            ElMessage({
              message: "err",
              type: 'error',
            })
          }
        })
        .catch((err) => {
          ElMessage({
            message: err,
            type: 'error',
          })
        });
      return false; //阻止图片继续上传，使得form表单提交时统一上传
    }
  }
  return false;
}

// 更新密码
const submitForm = async () => {
  const { password } = ruleFormRef;
  try {
    const result = await updatedPsd({ _id: user.value._id, password });
    if (result.code == 200) {
      ElMessage({
        message: '修改成功，3秒后返回登录页面',
        type: 'success',
      })
      ruleFormRef.password = ''
      setTimeout(() => {
        localRemove('token');
        router.replace('/login')
      }, 3000)

    }
  } catch (error) {
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