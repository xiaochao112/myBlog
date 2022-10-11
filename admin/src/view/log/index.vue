<template>
  <el-card class="box-card">
    <el-table :data="tableData" border :default-sort="{ prop: 'date', order: 'descending' }" height="500"
      style="width: 100%">
      <el-table-column prop="date" label="操作时间" width="120" />
      <el-table-column prop="name" label="ID" />
      <el-table-column prop="czuo" label="操作" />
      <el-table-column prop="delay" label="延迟(ms)">
        <template #default="scope">
          <el-tag class="ml-2" type="success">{{ scope.row.delay }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="states" label="状态" width="120">
        <template #default="scope">
          <el-tag class="ml-2" type="danger">{{ scope.row.states }}</el-tag>
        </template>
      </el-table-column>
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
    czuo: '222',
    delay: '0ms',
    states: 500
  },
]
</script>
<style lang="scss" scoped>

</style>