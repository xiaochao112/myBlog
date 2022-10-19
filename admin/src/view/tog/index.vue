<template>
  <div class="togContent">
    <!-- 树形控件 -->
    <TreeTog class="treeContent" ref="treeTogRef" @handleNodeClick="handleNodeClick"></TreeTog>
    <!-- 表格 -->
    <FirstTog class="tog" @getInfo="getInfo" :tableData="tableData" :listData="listData" :total="total"
      :loading="loading" @handleDelete="handleDelete" @getPage="getPage"></FirstTog>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import FirstTog from './firstTog/index.vue';
import TreeTog from './treeTog/index.vue';
import { getList, del } from '@/api/tog.js';
import tableHooks from '@/hooks/tableHooks';


const treeTogRef = ref();
const { getInfo, tableData, total, loading, handleDelete, listData, getPage } = tableHooks({ getList, del }, {})

const handleNodeClick = (data) => {
  getInfo({ typeId: data.typeId })
}

onBeforeMount(() => {
  getInfo()
})

</script>


<style lang="scss" scoped>
.togContent {
  display: flex;
  // justify-content: space-around;

  .treeContent {
    width: 15%;
  }

  .tog {
    width: 85%;
  }
}
</style>