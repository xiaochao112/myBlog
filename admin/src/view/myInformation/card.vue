<template>
  <el-card class="box-card">
    <el-button text @click="centerDialogVisible = true">Click to open the Dialog</el-button>
    <el-table :data="tableData" border :default-sort="{ prop: 'date', order: 'descending' }" height="250"
      style="width: 100%">
      <el-table-column prop="date" label="创建时间" sortable width="120" />
      <el-table-column prop="name" label="署名" width="90" />
      <el-table-column prop="title" label="标题" width="90" />
      <el-table-column prop="address" label="信息" :formatter="formatter" />
      <el-table-column prop="img" label="图片" width="90">
        <template>
          <img src="" alt="">
        </template>
      </el-table-column>
      <el-table-column align="center" label="Name" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    title: '1111',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    title: '1111',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    title: '1111',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>
<style lang="scss" scoped>

</style>