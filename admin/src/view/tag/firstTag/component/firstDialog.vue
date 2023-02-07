<template>
  <el-dialog v-model="centerDialogVisible" :title="`${prop.title}一级标签`" width="30%" align-center>
    <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-dynamic" :rules="rules"
      label-position="top">
      <el-form-item label="标签名：" prop="title">
        <el-input v-model="numberValidateForm.title" placeholder="请输入标签名：" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="是否设为重要：" prop="promise">
        <el-radio-group v-model="numberValidateForm.promise">
          <el-radio :label="true" />
          <el-radio :label="false" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注：" prop="desc">
        <el-input v-model="numberValidateForm.desc" placeholder="请输入备注：" type="text" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(formRef)">取消</el-button>
        <el-button type="primary" @click="submitForm(formRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import { add, update } from '@/api/tag.js';

const formRef = ref();
const centerDialogVisible = ref(false); // 对话框关闭或打开

const numberValidateForm = reactive({
  title: '',
  promise: false,
  desc: '',
  _id: ''
})
const rules = reactive({
  title: [{ required: true, message: '不能为空', trigger: 'blur' }],
})
// 子组件触发父组件方法
const emit = defineEmits(['getInfo']);
const prop = defineProps({
  title: {
    type: String,
    default: '新增'
  },
})

// 提交表单
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(
    async (valid, fields) => {
      if (valid) {
        console.log('submit!')
        let result
        if (prop.title == '新增') {
          const { title, desc, promise } = numberValidateForm;
          result = await add({ title, desc, promise });
        }
        else {
          result = await update(numberValidateForm);
        }
        if (result.code == 200) {
          ElMessage({
            message: `${prop.title}成功`,
            type: 'success',
          })
          // formEl.resetFields()
          resetFields()
          centerDialogVisible.value = false;
        } else {
          ElMessage({
            message: `${result.msg}`,
            type: 'error',
          })
        }
        emit('getInfo');
      } else {
        console.log('error submit!', fields)
      }
    })
}

// 关闭对话框
const resetForm = (formEl) => {
  centerDialogVisible.value = false;
  if (!formEl) return
  // formEl.resetFields()
  resetFields()
}
// 清除表单
const resetFields = () => {
  numberValidateForm.title = '';
  numberValidateForm.promise = false;
  numberValidateForm.desc = '';
  numberValidateForm._id = '';

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
