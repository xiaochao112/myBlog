<template>
  <el-card>
    <el-form ref="ruleFormRef" :model="ruleForm" label-position="top" :rules="rules" class="demo-ruleForm"
      :size="formSize" status-icon>
      <el-form-item label="文档标题" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="类型：" prop="typeId">
        <el-select v-model="ruleForm.typeId" placeholder="选择类型">
          <el-option v-for="item in dataList" :key="item.typeId" :label="item.title" :value="item.typeId"
            :disabled="item.disabled" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否摘要：" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox-button label="是" name="type" />
          <el-checkbox-button label="否" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="备注" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">内容预览</el-button>
        <el-button @click="resetForm(ruleFormRef)">清除</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>