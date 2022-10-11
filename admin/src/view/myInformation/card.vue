<template>
  <el-card class="box-card">
    <div class="header_box">
      <el-button type="primary" @click="addForm"> 新增 + </el-button>

      <el-input style=" width: 150px" v-model="keyWord" placeholder="搜索" :suffix-icon="Search" />
    </div>
    <el-table v-loading="loading" :data="tableData" border :default-sort="{ prop: 'date', order: 'descending' }"
      height="500" style="width: 100%">
      <el-table-column type=index label="序号" align="center" width="60" />
      <el-table-column prop="title" label="标题" width="120" />
      <el-table-column prop="title" label="来源" width="120" />
      <el-table-column prop="createdAt" label="创建时间" width="150">
        <template #default="scope">
          <p>{{ getData(scope.row['createdAt']) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt" label="最后更新时间" width="150">
        <template #default="scope">
          <p>{{ getData(scope.row['updatedAt']) }}</p>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="img" label="图片">
        <template #default="scope">
          <img :src="scope.row['img']" alt="">
        </template>
      </el-table-column> -->
      <el-table-column prop="desc" label="详情" />

      <el-table-column align="center" label="菜单" width="240">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="small" type="primary" @click="showInfo(scope.$index, scope.row)">查看详情</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" :pageNo="listData.pageNo" :pageSize="listData.pageSize" @getPage="getPage"></Pagination>
  </el-card>
  <!-- 新增或修改对话框 -->
  <myDialog ref="myDialogRef" :title="title" @getInfo="getInfo"></myDialog>
  <!-- 详情对话框 -->
  <myDescriptions ref="myDescriptionsRef"></myDescriptions>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getList, del } from '@/api/myInformation.js';
import { getData } from '@/utils';
import { Search } from '@element-plus/icons-vue';
import tableHooks from '@/hooks/tableHooks';
import myDialog from './component/myDialog.vue';
import myDescriptions from './component/myDescriptions.vue'

const title = ref('');
const keyWord = ref('');
const myDialogRef = ref(); // 新增或修改Ref
const myDescriptionsRef = ref()
// const centerDialogVisible = ref(false)

// 使用hook函数
// 封装表格方法
const { getInfo, tableData, total, loading, handleDelete, listData, getPage } = tableHooks({ getList, del })

// 新增一条数据
const addForm = () => {
  title.value = '新增'
  myDialogRef.value.centerDialogVisible = true;
}
// 修改某一条数据
const handleEdit = (index, row) => {
  console.log(index, row)
  title.value = '修改'
  myDialogRef.value.centerDialogVisible = true;
  // 携带表格数据
  myDialogRef.value.numberValidateForm.desc = row.desc;
  myDialogRef.value.numberValidateForm.title = row.title;
  myDialogRef.value.numberValidateForm.img = row.img;
  myDialogRef.value.numberValidateForm._id = row._id;
}
// 查看详情
const showInfo = (index, row) => {
  // console.log(index, row);
  myDescriptionsRef.value.detailObj = row;
  myDescriptionsRef.value.dialogVisible = true;
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
  width: 250px;
  display: flex;
  justify-content: space-around;
}
</style>