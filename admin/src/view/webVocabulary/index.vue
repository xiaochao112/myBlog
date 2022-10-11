<template>
  <el-card class="box-card">
    <div class="header_box">
      <el-button type="primary" @click="addForm"> 新增 + </el-button>
      <el-upload ref="addUpload" action :show-file-list="false" :headers="getAuthHeaders()"
        :before-upload="handleExcelUpload">
        <el-button type="primary"> 上传 </el-button>
      </el-upload>
      <el-button>
        <el-link href="http://localhost:3000/admin/api/excel/download">导出</el-link>
      </el-button>

      <el-input style=" width: 150px" v-model="keyWord" placeholder="单词搜索" :suffix-icon="Search" />
    </div>

    <el-table v-loading="loading" :data="tableData" stripe border :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%">
      <el-table-column prop="createdAt" label="创建时间" sortable width="180">
        <template #default="scope">
          <p>{{ getData(scope.row['createdAt']) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="word" label="首字母" width="120" />
      <el-table-column prop="title" label="中文" width="120">
        <template #default="scope">
          <el-tag class="ml-2">{{ scope.row.title }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="english" label="单词" width="120">
        <template #default="scope">
          <el-tag class="ml-2" type="success">{{ scope.row.english }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="备注" />
      <el-table-column align="center" label="菜单" width="240">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <Pagination :total="total" :pageNo="listData.pageNo" :pageSize="listData.pageSize" @getPage="getPage"></Pagination>
  </el-card>

  <MyDialog ref="myDialogRef" :title="title" @getInfo="getInfo">
  </MyDialog>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { getList, del } from '../../api/werVocabulary';
import { ElMessage } from 'element-plus';
import { localGet } from '../../utils/index'
import { download } from '../../api/expors';
import { Search } from '@element-plus/icons-vue';
import MyDialog from './component/myDialog.vue';
import { getData } from '../../utils';
import Pagination from '../../components/Pagination/index.vue';
import { excelUpload } from '../../api/upload';
import tableHooks from '../../hooks/tableHooks'

const myDialogRef = ref();
const title = ref('');
const keyWord = ref('');

// 使用hook函数
// 封装表格方法
const { handleExcelUpload, getInfo, tableData, handleDelete, addUpload, total, loading, listData, getPage } = tableHooks({ excelUpload, getList, del })

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
  myDialogRef.value.numberValidateForm.desc = row.desc;
  myDialogRef.value.numberValidateForm.title = row.title;
  myDialogRef.value.numberValidateForm.english = row.english;
  myDialogRef.value.numberValidateForm._id = row._id;

}


// 上传文件请求头配置
const getAuthHeaders = () => {
  return {
    'token': localGet('token')
  }
}

// 导出
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
  width: 400px;
  display: flex;
  justify-content: space-around;
}
</style>