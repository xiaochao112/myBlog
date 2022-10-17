<template>
  <el-dialog v-model="centerDialogVisible" :title="`${prop.title}资料卡`" width="30%" align-center>
    <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm" :rules="rules"
      label-position="top">
      <el-form-item label="标题" prop="title">
        <el-input v-model="numberValidateForm.title" placeholder="请输入标题：" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="上传图片：" prop="img">
        <el-upload class="avatar-uploader" ref="addUpload" action :show-file-list="false" :headers="getAuthHeaders()"
          :before-upload="handleUpload">
          <img v-if="numberValidateForm.img" :src="numberValidateForm.img" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="详情" prop="desc">
        <el-input v-model="numberValidateForm.desc" placeholder="请输入详细信息：" type="textarea" autocomplete="off" />
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
import { add, update } from '@/api/myInformation.js';
import { Plus } from '@element-plus/icons-vue';
import { localGet } from '@/utils';
import { uploadImg } from '@/api/upload';


const formRef = ref();
const addUpload = ref();
const centerDialogVisible = ref(false);
const numberValidateForm = reactive({
  title: '',
  desc: '',
  img: '',
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
            numberValidateForm.img = res.imgUrl;
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

const submitForm = async () => {
  let result
  if (prop.title == '新增') {
    const { title, desc, img } = numberValidateForm;
    if (img) {
      result = await add({ title, desc, img });
    } else {
      result = await add({ title, desc });
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
    numberValidateForm.title = '';
    numberValidateForm.desc = '';
    numberValidateForm.img = '';
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
  numberValidateForm.title = '';
  numberValidateForm.desc = '';
  numberValidateForm.img = '';
  centerDialogVisible.value = false;
}

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
