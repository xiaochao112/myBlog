<template>
  <div class="tagContent">
    <!-- 树形控件 -->
    <TreeTag class="treeContent" ref="treeTagRef" @handleNodeClick="handleNodeClick"></TreeTag>
    <!-- 表格 -->
    <FirstTag class="tag" @getInfo="getInfo" :tableData="tableData" :listData="listData" :total="total"
      :loading="loading" @handleDelete="handleDelete" @getPage="getPage"></FirstTag>
  </div>
</template>

<script setup>
import { onBeforeMount, provide, ref } from 'vue';
import FirstTag from './firstTag/index.vue';
import TreeTag from './treeTag/index.vue';
import { getList, del } from '@/api/tag.js';
import tableHooks from '@/hooks/tableHooks';
import { tagStore } from '@/store/modules/tagStore';

const state = tagStore()
const { getInfo, tableData, total, loading, handleDelete, listData, getPage } = tableHooks({ getList, del }, {})

const treeTagRef = ref();

const handleNodeClick = (data) => {
  if (data) {
    state.setTypeId(data.typeId);

    getInfo({ typeId: state.typeId })
  } else {
    state.setTypeId(null);
    getInfo()

  }
}

onBeforeMount(() => {
  getInfo()
})

</script>


<style lang="scss" scoped>
.tagContent {
  display: flex;
  // justify-content: space-around;

  .treeContent {
    width: 15%;
  }

  .tag {
    width: 85%;
  }
}
</style>