<template>
  <el-dialog v-model="dialogVisible" width="50%">
    <el-descriptions title="资料卡详细信息" :column="1">
      <el-descriptions-item label="标题：" label-class-name="my-label" class-name="my-content" width="150px">
        <el-tag size="small">{{ detailObj.title }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="图片："><img :src="detailObj.img" alt=""></el-descriptions-item>
      <el-descriptions-item label="创建时间：">
        <el-tag size="small">{{ detailObj.createdAt }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="最后更新时间：">
        <el-tag size="small">{{ detailObj.updatedAt }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="详细信息：">{{ detailObj.desc }}</el-descriptions-item>
    </el-descriptions>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessageBox } from 'element-plus';

const dialogVisible = ref(false);
const detailObj = ref({});

onMounted(() => {
  console.log(detailObj.value);
})
defineExpose({
  dialogVisible,
  detailObj
})
</script>

<style scoped>
.my-label {
  background: var(--el-color-success-light-9);
}

.my-content {
  background: var(--el-color-danger-light-9);
}
</style>
