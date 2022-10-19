<template>
  <el-dialog v-model="centerDialogVisible" :title="`${prop.title}标签`" width="30%" align-center>
    <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm" :rules="rules"
      label-position="top">
      <el-form-item label="类型：" prop="typeId">
        <el-select v-model="numberValidateForm.typeId" class="m-2" placeholder="Select" size="large">
          <el-option v-for="item in options" :key="item.typeId" :label="item.title" :value="item.typeId" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签名：" prop="title">
        <el-input v-model="numberValidateForm.title" placeholder="请输入标签名：" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注：" prop="desc">
        <el-input v-model="numberValidateForm.desc" placeholder="请输入备注：" type="text" autocomplete="off" />
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
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import { getList } from '@/api/tog.js';
import { add, update } from '@/api/togItem.js';

const formRef = ref();
const centerDialogVisible = ref(false); // 对话框关闭或打开

const numberValidateForm = reactive({
  title: '',
  typeId: 0,
  desc: '',
  _id: ''
})
const rules = reactive({
  title: [{ required: true, message: '不能为空', trigger: 'blur' }],
})

const value = ref()

const options = ref([])
// 子组件触发父组件方法
const emit = defineEmits(['getInfo']);

const prop = defineProps({
  title: {
    type: String,
    default: '新增'
  },
})

const getTogList = async () => {
  let result = await getList();
  options.value = result.data
}

const submitForm = async () => {
  let result
  if (prop.title == '新增') {
    const { title, desc, typeId } = numberValidateForm;
    result = await add({ title, desc, typeId });
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
    numberValidateForm._id = '';
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
  numberValidateForm._id = '';
  centerDialogVisible.value = false;
}
onMounted(() => {
  getTogList()
})

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
