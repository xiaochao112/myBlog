<template>
  <el-dialog v-model="centerDialogVisible" :title="`${prop.title}用户`" width="30%" align-center>
    <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm" :rules="rules"
      label-position="top">
      <el-form-item label="用户名" prop="username">
        <el-input :disabled="title == '修改'" v-model="numberValidateForm.username" placeholder="请输入用户名" type="text"
          autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="numberValidateForm.password" placeholder="请输入密码" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="上传图片：" prop="avatar">
        <el-upload class="avatar-uploader" ref="addUpload" http-request="httpRequest" action :show-file-list="false"
          :headers="getAuthHeaders()" :before-upload="handleUpload">
          <img v-if="numberValidateForm.avatar" :src="numberValidateForm.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import { add, update } from '@/api/user.js';
import { Plus } from '@element-plus/icons-vue';
import { localGet } from '@/utils';
import { uploadImg } from '@/api/upload';


const formRef = ref();
const addUpload = ref();
const centerDialogVisible = ref(false);
const numberValidateForm = reactive({
  username: '',
  password: '',
  avatar: '',
  file: '',
  _id: ''
})
const rules = reactive({
  english: [{ required: true, message: '不能为空', trigger: 'blur' }],
})
// 子组件触发父组件方法
const emit = defineEmits(['getInfo']);
const prop = defineProps({
  title: {
    type: String,
    default: '新增'
  },
})

// 请求头配置
const getAuthHeaders = () => {
  return {
    'token': localGet('token')
  }
}

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
      // 上传图片
      uploadImg(formData)
        .then((res) => {
          if (res.code = 200) {
            numberValidateForm.avatar = res.imgUrl;
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
const httpRequest = (param) => {
  numberValidateForm.file = param.file
}

// 提交表单
const submitForm = async () => {
  let result
  if (prop.title == '新增') {
    const { username, password, avatar } = numberValidateForm;
    if (avatar) {
      result = await add({ username, password, avatar });
    } else {
      result = await add({ username, password });
    }

  }
  else {
    result = await update(numberValidateForm);
  }
  if (result.code == 200) {
    ElMessage({
      message: `${prop.title}成功`,
      type: 'success',
    })
    numberValidateForm.username = '';
    numberValidateForm.password = '';
    numberValidateForm.avatar = '';
    centerDialogVisible.value = false;
  } else {
    ElMessage({
      message: `${result.msg}`,
      type: 'error',
    })
  }
  emit('getInfo');
}

const resetForm = () => {
  numberValidateForm.username = '';
  numberValidateForm.password = '';
  numberValidateForm.avatar = '';
  centerDialogVisible.value = false;
}

// 暴露给父组件使用
defineExpose({
  centerDialogVisible,
  numberValidateForm
})
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
