<template>
  <el-dialog v-model="centerDialogVisible" :title="`${prop.title}资料卡`" width="30%" align-center>
    <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm" :rules="rules"
      label-position="top">
      <el-form-item label="标题" prop="title">
        <el-input v-model="numberValidateForm.title" placeholder="请输入标题：" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="上传图片：" prop="img">
        <el-upload class="avatar-uploader" ref="addUpload" action :show-file-list="false" :headers="getAuthHeaders()"
          :http-request="httpRequest">
          <img v-if="numberValidateForm.imgUrl || numberValidateForm.img"
            :src="numberValidateForm.imgUrl ? numberValidateForm.imgUrl : img" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="详情" prop="desc">
        <el-input v-model="numberValidateForm.desc" placeholder="请输入详细信息：" type="textarea" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">确定</el-button>
        <el-button @click="resetForm(formRef)">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>


<script setup>
import { computed, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import { add, update } from '@/api/myInformation.js';
import { Plus } from '@element-plus/icons-vue';
import { localGet } from '@/utils';
import { uploadImg } from '@/api/upload';


const formRef = ref();
const addUpload = ref();
const file = ref();
const centerDialogVisible = ref(false);
const numberValidateForm = reactive({
  title: '',
  desc: '',
  img: '',
  imgUrl: '',
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

// 获取要上传的文件信息
const httpRequest = (param) => {
  file.value = param.file // 相当于input里取得的files
  // 图片预览
  const reader = new FileReader();
  reader.readAsDataURL(param.file);
  reader.onload = () => {
    const _base64 = reader.result;
    numberValidateForm.imgUrl = _base64; //将_base64赋值给图片的src，实现图片预览
  };

}
// 请求头配置
const getAuthHeaders = () => {
  return {
    'token': localGet('token')
  }
}
// 修改图片路径
const img = computed(() => {
  return import.meta.env.VITE_API_URL + numberValidateForm.img
})

// 表单上传
const submitForm = async (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      addUpload.value.submit();
      // 上传文件对象
      let formData = new FormData();
      formData.append("avatar", file.value);
      try {
        let result
        if (numberValidateForm.imgUrl) {
          // 上传图片
          const res = await uploadImg(formData);
          numberValidateForm.img = res.imgUrl;
        }
        // 新增或修改接口
        if (prop.title == '新增') {
          const { title, img, desc } = numberValidateForm;
          if (img) {
            result = await add({ title, img, desc });
          } else {
            result = await add({ title, desc });
          }

        }
        if (prop.title == '修改') {
          result = await update(numberValidateForm);
        }
        if (result.code == 200) {
          ElMessage({
            message: `${prop.title}成功`,
            type: 'success',
          })

          // formEl.resetFields();
          numberValidateForm.title = '';
          numberValidateForm.imgUrl = '';
          numberValidateForm.img = '';
          numberValidateForm.desc = '';


          centerDialogVisible.value = false;
        } else {
          ElMessage({
            message: `${result.msg}`,
            type: 'error',
          })
        }
        emit('getInfo');
      } catch (error) {
        console.log(error);
      }
    }
  })
  // formEl.a
}

// 清除表单信息
const resetForm = (formEl) => {
  numberValidateForm.title = '';
  numberValidateForm.desc = '';
  numberValidateForm.img = '';
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
