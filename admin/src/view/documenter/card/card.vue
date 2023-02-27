<template>
  <el-card class="box-card">
    <div class="header_box">
      <el-button type="primary" v-auth="'add'" @click="addForm">
        新增 +
      </el-button>

      <el-input
        style="width: 150px; margin-left: 50px"
        v-model="keyWord"
        placeholder="搜索"
        :suffix-icon="Search"
      />
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column type="index" label="序号" align="center" width="60" />
      <el-table-column prop="title" label="标题" align="center" width="120" />
      <el-table-column prop="title" label="来源" align="center" width="120" />
      <el-table-column
        prop="createdAt"
        align="center"
        label="创建时间"
        width="150"
      >
        <template #default="scope">
          <p>{{ getData(scope.row['createdAt']) }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="updatedAt"
        align="center"
        label="最后更新时间"
        width="150"
      >
        <template #default="scope">
          <p>{{ getData(scope.row['updatedAt']) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="img" label="图片">
        <template #default="scope">
          <img :src="`${img + scope.row['img']}`" alt="" style="width: 60px" />
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="备注" />

      <el-table-column align="center" label="菜单" width="240">
        <template #default="scope">
          <el-button
            size="small"
            v-auth="'edit'"
            @click="handleEdit(scope.$index, scope.row)"
          >
            修改
          </el-button>
          <el-button
            size="small"
            type="primary"
            v-auth="'show'"
            @click="showInfo(scope.$index, scope.row)"
          >
            查看
          </el-button>
          <el-button
            size="small"
            type="danger"
            v-auth="'delelt'"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="total"
      :pageNo="listData.pageNo"
      :pageSize="listData.pageSize"
      @getPage="getPage"
    ></Pagination>

    <!-- 新增或修改对话框 -->
    <myDialog ref="myDialogRef" :title="title" @getInfo="getInfo"></myDialog>
    <!-- 详情对话框 -->
    <!-- <myDescriptions ref="myDescriptionsRef"></myDescriptions> -->
  </el-card>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { getList, del } from '@/api/myInformation.js'
import { getData } from '@/utils'
import { Search } from '@element-plus/icons-vue'
import tableHooks from '@/hooks/tableHooks'
import myDialog from './component/myDialog.vue'
import myDescriptions from './component/myDescriptions.vue'

const title = ref('')
const keyWord = ref('')
const myDialogRef = ref() // 新增或修改Ref
const myDescriptionsRef = ref()
// const centerDialogVisible = ref(false)

// 使用hook函数
// 封装表格方法
const { getInfo, tableData, total, loading, handleDelete, listData, getPage } =
  tableHooks({ getList, del })

// 修改图片路径
const img = computed(() => {
  return import.meta.env.VITE_API_URL
})

// 新增一条数据
const addForm = () => {
  title.value = '新增'
  myDialogRef.value.centerDialogVisible = true
}
// 修改某一条数据
const handleEdit = (index, row) => {
  console.log(index, row)
  title.value = '修改'
  myDialogRef.value.centerDialogVisible = true
  // 携带表格数据
  myDialogRef.value.numberValidateForm.desc = row.desc
  myDialogRef.value.numberValidateForm.title = row.title
  myDialogRef.value.numberValidateForm.img = row.img
  myDialogRef.value.numberValidateForm._id = row._id
}
// 查看详情
const showInfo = (index, row) => {
  // myDescriptionsRef.value.detailObj = row
  // myDescriptionsRef.value.dialogVisible = true
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
  display: flex;
  .el-button {
    margin-right: 20px;
  }
}
</style>