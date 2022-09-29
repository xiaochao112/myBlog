<template>
  <el-pagination v-model:currentPage="currentPage4" v-model:page-size="pageSize4" :page-sizes="[10, 20, 30, 40]"
    :small="small" :disabled="disabled" :background="background" layout=" ->, total, prev, pager, next, jumper, sizes"
    :total="100" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script setup>
import { ref } from 'vue';

const currentPage4 = ref(4)
const pageSize4 = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>

<style lang="scss" scoped>

</style>