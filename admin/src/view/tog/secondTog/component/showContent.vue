<template>
  <el-dialog v-model="dialogVisible" title="内容预览" width="1000px" top="50px">
    <h3 v-if="false">{{ ruleForm.typeId }}</h3>
    <el-descriptions title="" :column="2" style="width: 400px">
      <el-descriptions-item label="文章名称">
        <el-tag size="small">{{ ruleForm.title }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="类型">
        <el-tag size="small">{{ currentFristTag.title }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">{{ ruleForm.desc }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <div class="view" v-html="ruleForm.content"></div>
    <div>
      <el-button type="primary" @click="updateContent">编辑</el-button>
    </div>
  </el-dialog>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>