<template>
  <el-dialog v-model="centerDialogVisible" :title="`${prop.title}二级标签`" width="30%" align-center>
    <el-form ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-dynamic" :rules="rules"
      label-position="top">
      <el-form-item label="类型：" prop="typeId">
        <el-select v-model="numberValidateForm.typeId" class="m-2" placeholder="Select" size="large"
          @change="changeValue">
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
        <el-button @click="resetForm(formRef)">取消</el-button>
        <el-button type="primary" @click="submitForm(formRef)">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { ElMessage } from 'element-plus'
import { getList } from '@/api/tag.js';
import { add, update } from '@/api/tagItem.js';

const formRef = ref();
const centerDialogVisible = ref(false); // 对话框关闭或打开

const numberValidateForm = reactive({
  title: '',
  typeId: null,
  desc: '',
  _id: ''
})

const rules = reactive({
  title: [{ required: true, message: '不能为空', trigger: 'blur' }],
  typeId: [{ required: true, message: '不能为空', trigger: 'blur' }],

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
// 获取类型列表
const getTagList = async () => {
  let result = await getList();
  options.value = result.data
}
// 
const changeValue = (data) => { }

// 提交添加或修改表单
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(
    async (valid, fields) => {
      if (valid) {
        console.log('submit!', fields)

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
// 取消提交
const resetForm = (formEl) => {
  centerDialogVisible.value = false;
  if (!formEl) return
  // formEl.resetFields()
  resetFields()
}
const resetFields = () => {
  numberValidateForm.title = '';
  numberValidateForm.typeId = null;
  numberValidateForm.desc = '';
  numberValidateForm._id = '';

}
onMounted(() => {
  getTagList()
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
