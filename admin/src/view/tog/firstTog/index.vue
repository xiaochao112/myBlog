<template>
  <!-- <el-card class="box-card">
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
      <el-table-column prop="firstTitle" label="标签名" width="120" />
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

    添加、修改对话框
    <MyDialog ref="myDialogRef" :title="title" @getInfo="getInfo">
    </MyDialog>
  </el-card> -->
  <el-tree :data="tableData" :props="defaultProps" @node-click="handleNodeClick" />
</template>

<script setup>
import { getList } from '@/api/tog.js';
import tableHooks from '@/hooks/tableHooks';
import { onMounted } from '@vue/runtime-core';


const { getInfo, tableData, total, loading, handleDelete, listData, getPage } = tableHooks({ getList })

const handleNodeClick = (data) => {
  console.log(data)
}
onMounted(() => {
  getInfo()
})

// const data = [
//   {
//     label: 'Level one 1',
//     children: [
//       {
//         label: 'Level two 1-1',
//         children: [
//           {
//             label: 'Level three 1-1-1',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     label: 'Level one 2',
//     children: [
//       {
//         label: 'Level two 2-1',
//         children: [
//           {
//             label: 'Level three 2-1-1',
//           },
//         ],
//       },
//       {
//         label: 'Level two 2-2',
//         children: [
//           {
//             label: 'Level three 2-2-1',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     label: 'Level one 3',
//     children: [
//       {
//         label: 'Level two 3-1',
//         children: [
//           {
//             label: 'Level three 3-1-1',
//           },
//         ],
//       },
//       {
//         label: 'Level two 3-2',
//         children: [
//           {
//             label: 'Level three 3-2-1',
//           },
//         ],
//       },
//     ],
//   },
// ]

const defaultProps = {
  children: 'secondtogs',
  label: 'firstTitle',
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