<template>
  <div class="tree">
    <p @click="hadleClickAll" class="all_tog">全部</p>
    <el-tree :data="tableData" :props="defaultProps" @node-click="handleNodeClick" />
  </div>
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
const hadleClickAll = () => {
  emit('handleNodeClick')
}
onBeforeMount(() => {
  getInfo()
})

const defaultProps = {
  label: 'title',
}
</script>

<style lang="scss" scoped>
.tree {

  .all_tog {
    text-indent: 1.5rem;
    cursor: pointer;

    &:hover {
      background-color: rgba(226, 214, 214, 0.3);
    }

    &:checked {
      background-color: rgba(226, 214, 214, 0.3);
    }
  }
}
</style>