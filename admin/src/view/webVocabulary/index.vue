<template>
  <el-card class="box-card">
    <div class="header_box">
      <el-button type="primary" @click="addForm"> 新增 + </el-button>
      <el-button type="primary" @click="addForm"> 上传 </el-button>
      <el-button>
        <el-link href="http://localhost:3000/admin/api/excel/download">导出</el-link>
      </el-button>

      <el-input style="margin-left: 20px; width: 150px" v-model="keyWord" placeholder="单词搜索" :suffix-icon="Search" />
    </div>

    <el-table :data="tableData" border :default-sort="{ prop: 'date', order: 'descending' }" height="250"
      style="width: 100%">
      <el-table-column prop="createdAt" label="创建时间" sortable width="180">
        <template #default="scope">
          <p>{{ getData(scope.row['createdAt']) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="word" label="首字母" width="120" />
      <el-table-column prop="title" label="中文" width="120" />
      <el-table-column prop="english" label="单词" width="120" :formatter="formatter" />
      <el-table-column prop="desc" label="备注" />
      <el-table-column align="center" label="菜单" width="180">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination></Pagination>
  </el-card>

  <MyDialog ref="myDialogRef" :title="title"></MyDialog>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getInfoApi } from '../../api/werVocabulary';
import { download } from '../../api/expors';
import { Search } from '@element-plus/icons-vue';
import MyDialog from './component/myDialog.vue';
import { getData } from '../../utils';
import Pagination from '../../components/Pagination/index.vue';

const myDialogRef = ref();
const title = ref();
const tableData = ref([]);
const keyWord = ref('');
// 获取列表信息
const getInfo = async () => {
  const { data } = await getInfoApi();
  if (data) {
    tableData.value = data
  }
}
const formatter = (row, column) => {
  return row.address
}

const addForm = () => {
  title.value = '新增'
  myDialogRef.value.centerDialogVisible = true;
}
const handleEdit = (index, row) => {
  // console.log(index, row)
  title.value = '修改'
  myDialogRef.value.centerDialogVisible = true;

}
const handleDelete = (index, row) => {
  console.log(index, row)
}
const exportXmls = () => {
  // window.open('http://localhost:3000/admin/api/excel/download')
}

onMounted(() => {
  getInfo()
})

</script>
<style lang="scss" scoped>
.el-table {
  margin-bottom: 40px;
}

.header_box {
  padding: 20px 0 50px 0;
}
</style>