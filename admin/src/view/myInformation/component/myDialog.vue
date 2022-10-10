<template>
  <el-dialog v-model="centerDialogVisible" :title="`${prop.title}资料卡`" width="30%" align-center>
    <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm" :rules="rules"
      label-position="top">
      <el-form-item label="标题" prop="title">
        <el-input v-model="numberValidateForm.title" placeholder="请输入标题：" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="上传图片：" prop="img">
        <el-upload class="avatar-uploader" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
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
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import { add, update } from '@/api/myInformation.js';
import { Plus } from '@element-plus/icons-vue';

const formRef = ref()
const centerDialogVisible = ref(false);
const numberValidateForm = reactive({
  title: '',
  desc: '',
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
const imageUrl = ref('')

const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    // ElMessage.error('Avatar picture must be JPG format!')
    // return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const submitForm = async () => {
  let result
  if (prop.title == '新增') {
    const { title, desc } = numberValidateForm
    result = await add({ title, desc });
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
