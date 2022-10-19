<template>
  <el-tree :data="tableData" :props="defaultProps" @node-click="handleNodeClick" />
</template>

<script setup>
import { getList } from '@/api/tog.js';
import tableHooks from '@/hooks/tableHooks';
import { onBeforeMount } from '@vue/runtime-core';

const { getInfo, tableData } = tableHooks({ getList })

const emit = defineEmits(['handleNodeClick'])

const handleNodeClick = (data) => {
  // console.log(data);
  emit('handleNodeClick', data)
}
onBeforeMount(() => {
  getInfo()
})

const defaultProps = {
  label: 'title',
}
</script>

<style lang="scss" scoped>

</style>