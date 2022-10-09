<template>
  <el-pagination v-model:currentPage="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]" :small="small"
    :disabled="disabled" :background="background" layout=" ->, total, prev, pager, next, jumper, sizes" :total="total"
    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script setup>
import { ref } from 'vue';

const small = ref(false)
const background = ref(false)
const disabled = ref(false)

// 调用父组件的方法
const emit = defineEmits(['getPage'])

const prop = defineProps({
  total: {
    type: Number,
    default: 20
  },
  pageNo: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 10
  }
})

// 每页显示的数量
const handleSizeChange = (val) => {
  emit('getPage', prop.pageNo, val);
}
// 当前页数
const handleCurrentChange = (val) => {
  emit('getPage', val, prop.pageSize);
}
</script>

<style lang="scss" scoped>

</style>