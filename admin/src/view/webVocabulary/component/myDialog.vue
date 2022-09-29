<template>
  <el-dialog v-model="centerDialogVisible" :title="`${prop.title}单词`" width="30%" align-center>
    <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm" :rules="rules"
      label-position="top">
      <el-form-item label="单词：" prop="english">
        <el-input v-model="numberValidateForm.english" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="中文：" prop="title">
        <el-input v-model="numberValidateForm.title" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注：" prop="desc">
        <el-input v-model="numberValidateForm.desc" type="text" autocomplete="off" />
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
import { add } from '../../../api/werVocabulary';

const formRef = ref()
const centerDialogVisible = ref(false);
const numberValidateForm = reactive({
  english: '',
  title: '',
  desc: '',
})
const rules = reactive({
  english: [{ required: true, message: '不能为空', trigger: 'blur' }],
})

const prop = defineProps({
  title: {
    type: String,
    default: '新增'
  }
})

const submitForm = async () => {
  const result = await add(numberValidateForm);
  if (result.code == 200) {
    ElMessage({
      message: `${prop.title}成功`,
      type: 'success',
    })
    centerDialogVisible.value = false;
  } else {
    ElMessage({
      message: `${result.msg}`,
      type: 'error',
    })
  }

}

const resetForm = () => {

  centerDialogVisible.value = false;
}

defineExpose({
  centerDialogVisible
})
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
