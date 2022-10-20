<template>
  <el-dialog v-model="dialogVisible" title="富文本内容预览" width="1300px" top="50px">
    <div class="view" v-html="content"></div>

  </el-dialog>
</template>

<script setup>

const props = defineProps({
  content: { type: String },
  dialogVisible: { type: Boolean }
})
</script>

<style lang="scss" scoped>

</style>