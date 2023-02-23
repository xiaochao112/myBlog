<template>
  <el-dialog v-model="centerDialogVisible" :title="`${prop.title}单词`" width="30%" align-center>
    <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-dynamic" :rules="rules"
      label-position="top">
      <el-form-item label="单词：" prop="english">
        <el-input v-model="numberValidateForm.english" placeholder="请输入英文：" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="中文：" prop="title">
        <el-input v-model="numberValidateForm.title" placeholder="请输入中文信息：" type="text" autocomplete="off" />
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
import { add, update } from '../../../api/werVocabulary';

const formRef = ref()
const centerDialogVisible = ref(false);
const numberValidateForm = reactive({
  english: '',
  title: '',
  desc: '',
  _id: ''
})
const rules = reactive({
  english: [{ required: true, message: '不能为空', trigger: 'blur' }],
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

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(
    async (valid, fields) => {
      if (valid) {
        console.log('submit!')
        let result
        if (prop.title == '新增') {
          const { english, title, desc } = numberValidateForm;
          result = await add({ english, title, desc });
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

const resetForm = (formEl) => {
  if (!formEl) return
  // formEl.resetFields()
  resetFields()
  centerDialogVisible.value = false;
}
const resetFields = () => {
  numberValidateForm.english = '';
  numberValidateForm.title = '';
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
