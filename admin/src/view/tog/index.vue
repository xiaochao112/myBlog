<template>
  <div class="togContent">
    <!-- 树形控件 -->
    <TreeTog class="treeContent" ref="treeTogRef" @handleNodeClick="handleNodeClick"></TreeTog>
    <!-- 表格 -->
    <FirstTog class="tog" @getInfo="getInfo" :tableData="tableData" :typeId="typeId" :listData="listData" :total="total"
      :loading="loading" @handleDelete="handleDelete" @getPage="getPage"></FirstTog>
  </div>
</template>

<script setup>
import { onBeforeMount, provide, ref } from 'vue';
import FirstTog from './firstTog/index.vue';
import TreeTog from './treeTog/index.vue';
import { getList, del } from '@/api/tog.js';
import tableHooks from '@/hooks/tableHooks';

const { getInfo, tableData, total, loading, handleDelete, listData, getPage } = tableHooks({ getList, del }, {})

const treeTogRef = ref();
const typeId = ref(0); // 标签页是否只显示某个标签栏

const handleNodeClick = (data) => {
  typeId.value = data.typeId;
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