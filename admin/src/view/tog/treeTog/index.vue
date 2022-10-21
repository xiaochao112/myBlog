<template>
  <div class="tree">
    <p @click="hadleClickAll" class="all_tog">全部</p>
    <el-tree :data="tableData" :props="defaultProps" @node-click="handleNodeClick" />
  </div>
</template>

<script setup>
import { getList } from '@/api/tog.js';
import tableHooks from '@/hooks/tableHooks';
import { onBeforeMount, ref } from 'vue';

const tableData = ref([]);
const total = ref(0);
const emit = defineEmits(['handleNodeClick'])

const handleNodeClick = (data) => {
  // console.log(data);
  emit('handleNodeClick', data)
}
const hadleClickAll = () => {
  emit('handleNodeClick')
}

// 初始化
const getInfo = async () => {
  const result = await getList();
  if (result.code == 200) {
    // 如果有图片处理一下路径
    if (result.data[0] && result.data[0].img) {
      tableData.value = result.data.map(item => {
        item.img = import.meta.env.VITE_API_URL + item.img
        return item
      });
    } else {
      tableData.value = result.data;
    }
    total.value = result.total;
  }
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