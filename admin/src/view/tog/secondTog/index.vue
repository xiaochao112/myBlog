<template>
  <el-table v-loading="loading" :data="secondtogs" border :default-sort="{ prop: 'date', order: 'descending' }"
    style="width: 100%">
    <el-table-column type=index label="序号" align="center" width="60" />
    <el-table-column prop="title" label="二级标签" width="120" />
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
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { getList } from '@/api/tog.js';
import { del } from '@/api/togItem.js';
import { getData } from '@/utils';
import tableHooks from '@/hooks/tableHooks';
import MyDialog from './component/myDialog.vue';

const title = ref('');
const myDialogRef = ref();

// 使用hook函数
// 封装表格方法
const { getInfo, tableData, total, loading, handleDelete, listData, getPage } = tableHooks({ getList, del })

const secondtogs = computed(() => {
  return tableData.value[0] && tableData.value[0].secondtogs || []
})
// 新增一条数据
const addForm = () => {
  title.value = '新增'
  myDialogRef.value.centerDialogVisible = true;
}
// 修改某一条数据
const handleEdit = (index, row) => {
  title.value = '修改';
  myDialogRef.value.centerDialogVisible = true;
  // 表单数据渲染
  myDialogRef.value.numberValidateForm._id = row._id;
  myDialogRef.value.numberValidateForm.typeId = row.typeId;
  myDialogRef.value.numberValidateForm.title = row.title;
  myDialogRef.value.numberValidateForm.desc = row.desc;

}
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