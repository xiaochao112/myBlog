<template>
  <el-card class="box-card">
    <el-table :data="tableData" border :default-sort="{ prop: 'date', order: 'descending' }" height="500"
      style="width: 100%">
      <el-table-column prop="date" label="创建时间" width="120" />
      <el-table-column prop="name" label="操作" />
      <el-table-column prop="name" label="延迟(ms)" />
      <el-table-column prop="title" label="状态" width="120" />
    </el-table>
    <Pagination></Pagination>
  </el-card>
</template>

<script setup>
import { ref } from 'vue';

const centerDialogVisible = ref(false)
const formatter = (row, column) => {
  return row.address
}

const handleEdit = (index, row) => {
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    title: '1111',
  },
]
</script>
<style lang="scss" scoped>

</style>