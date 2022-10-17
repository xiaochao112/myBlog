<template>
  <el-card class="box-card">
    <div class="header_box">
      <el-button type="primary" @click="addForm"> 新增 + </el-button>
      <el-button type="primary"> 上传 </el-button>
      <el-button>
        <el-link href="#">导出</el-link>
      </el-button>

      <el-input style=" width: 150px" placeholder="搜索" :suffix-icon="Search" />
    </div>
    <el-table v-loading="loading" :data="tableData" border :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%">
      <el-table-column type=index label="序号" align="center" width="60" />
      <el-table-column prop="togTitle" label="标签名" width="120" />
      <el-table-column prop="createdAt" label="创建时间" width="150">
        <template #default="scope">
          <p>{{ getData(scope.row['createdAt']) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间" width="150">
        <template #default="scope">
          <p>{{ getData(scope.row['updatedAt']) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="typeId" label="类型" width="120" />
      <el-table-column prop="desc" label="备注" />

      <el-table-column align="center" label="菜单" width="240">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" :pageNo="listData.pageNo" :pageSize="listData.pageSize" @getPage="getPage"></Pagination>

    <!-- 添加、修改对话框 -->
    <MyDialog ref="myDialogRef" :title="title" @getInfo="getInfo">
    </MyDialog>
  </el-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getList } from '@/api/tog.js';
import { getData } from '@/utils';
import { Search } from '@element-plus/icons-vue';
import tableHooks from '@/hooks/tableHooks';
import MyDialog from './component/myDialog.vue';

const title = ref('');
const myDialogRef = ref();

// 使用hook函数
// 封装表格方法
const { getInfo, tableData, total, loading, handleDelete, listData, getPage } = tableHooks({ getList })

// 新增一条数据
const addForm = () => {
  title.value = '新增'
  myDialogRef.value.centerDialogVisible = true;
}
// 修改某一条数据
const handleEdit = (index, row) => {
  console.log(index, row)
  title.value = '修改';
  myDialogRef.value.centerDialogVisible = true;
  // 表单数据渲染
  myDialogRef.value.numberValidateForm._id = row._id;
  myDialogRef.value.numberValidateForm.togTitle = row.togTitle;
  myDialogRef.value.numberValidateForm.desc = row.desc;

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
  width: 400px;
  display: flex;
  justify-content: space-around;
}
</style>