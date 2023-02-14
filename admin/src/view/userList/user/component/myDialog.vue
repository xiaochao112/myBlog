<template>
  <el-dialog
    v-model="centerDialogVisible"
    :title="`${title}用户`"
    width="30%"
    align-center
    :before-close="handleClone"
  >
    <el-form
      ref="formRef"
      :model="numberValidateForm"
      label-width="100px"
      class="demo-ruleForm"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          :disabled="title == '修改'"
          v-model="numberValidateForm.username"
          placeholder="请输入用户名"
          type="text"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="是否启用" prop="status">
        <el-radio-group v-model="numberValidateForm.status">
          <el-radio :label="true" />
          <el-radio :label="false" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="numberValidateForm.password"
          placeholder="请输入密码"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="上传头像：" prop="imgUrl">
        <el-upload
          class="avatar-uploader"
          action
          ref="addUpload"
          :http-request="httpRequest"
          :show-file-list="false"
          :headers="getAuthHeaders()"
          :limit="3"
        >
          <img
            v-if="imgUrl || numberValidateForm.avatar"
            :src="imgUrl ? imgUrl : avater"
            class="avatar"
            style="width: 120px"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="备注" prop="dosc">
        <el-input
          v-model="numberValidateForm.dosc"
          placeholder="请输入备注"
          type="textarea"
          autocomplete="off"
        />
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


<script setup>
import { computed, nextTick, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { add, update } from '@/api/user.js'
import { Plus } from '@element-plus/icons-vue'
import { localGet } from '@/utils'
import { uploadImg } from '@/api/upload'

const formRef = ref()
const addUpload = ref()
const isView = ref(false)
const centerDialogVisible = ref(false)
const imgUrl = ref('') // 图片上传预览
const file = ref() // 上传文件
const numberValidateForm = reactive({
  username: '',
  password: '',
  status: true,
  avatar: '',
  dosc: '',
  _id: '',
})
const rules = reactive({
  username: [{ required: true, message: '不能为空', trigger: 'blur' }],
  // password: [{ required: true, message: '不能为空', trigger: 'blur' }],
})
// 子组件触发父组件方法
const emit = defineEmits(['getInfo'])
const title = ref('')

// 头像路径
const avater = computed(() => {
  return import.meta.env.VITE_API_URL + numberValidateForm.avatar
})

// 请求头配置
const getAuthHeaders = () => {
  return {
    token: localGet('token'),
  }
}

// 自行实现上传文件的请求
const httpRequest = (param) => {
  file.value = param.file // 相当于input里取得的files
  // 图片预览
  const reader = new FileReader()
  reader.readAsDataURL(param.file)
  reader.onload = () => {
    const _base64 = reader.result
    imgUrl.value = _base64 //将_base64赋值给图片的src，实现图片预览
  }
}

// 提交表单
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      addUpload.value.submit()
      // 上传文件对象
      let formData = new FormData()
      formData.append('avatar', file.value)
      try {
        let result
        if (imgUrl.value) {
          // 上传图片
          const res = await uploadImg(formData)
          numberValidateForm.avatar = res.imgUrl
        }
        // 新增或修改接口
        if (title.value == '新增') {
          const { username, password, avatar, dosc } = numberValidateForm
          if (avatar) {
            result = await add({ username, password, avatar, dosc })
          } else {
            result = await add({ username, password, dosc })
          }
        }
        if (title.value == '修改') {
          result = await update(numberValidateForm)
        }
        if (result.code == 200) {
          ElMessage({
            message: `${title.value}成功`,
            type: 'success',
          })

          formEl.resetFields()
          // resetFields()
          centerDialogVisible.value = false
        } else {
          ElMessage({
            message: `${result.msg}`,
            type: 'error',
          })
        }
        emit('getInfo')
      } catch (error) {
        console.log(error)
      }
    }
  })
}

// 关闭对话框前的回调
const handleClone = (done) => {
  done()
}

// 取消提交
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  centerDialogVisible.value = false
}

// 获取父组件传过来的数据
const getPresonData = (data) => {
  // console.log(data.row)
  let { row, text } = data
  isView.value = text === '查看'
  numberValidateForm.avatar = row.avatar
  numberValidateForm.username = row.username
  numberValidateForm.password = row.password
  numberValidateForm.dosc = row.dosc
  numberValidateForm._id = row._id
  numberValidateForm.status = row.status || true

  title.value = text
  centerDialogVisible.value = true
}

// 暴露给父组件使用
defineExpose({
  getPresonData,
  centerDialogVisible,
  // numberValidateForm,
})
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
