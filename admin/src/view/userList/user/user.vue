<template>
  <el-card class="box-card">
    <div class="header_box">
      <el-button type="primary" v-auth="'add'" @click="openDrawer('新增')">
        新增 +
      </el-button>
      <el-button type="primary" v-auth="'import'">上传</el-button>
      <el-button v-auth="'export'">
        <el-link href="#">导出</el-link>
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
      <el-table-column
        prop="username"
        label="用户名"
        align="center"
        width="120"
      />
      <el-table-column
        prop="creationTime"
        label="创建时间"
        align="center"
        width="150"
      >
        <template #default="scope">
          <p>{{ getData(scope.row['creationTime']) }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="endLoginTime"
        label="最后登录时间"
        align="center"
        width="150"
      >
        <template #default="scope">
          <p>{{ getData(scope.row['endLoginTime']) }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="roleId" label="权限" align="center" width="120">
        <template #default="scope">
          <!-- <el-tag class="ml-2" type="success">{{ scope.row.roleId }}</el-tag> -->
          <el-tag class="ml-2" type="success">普通用户</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="dosc" label="备注" />
      <el-table-column prop="status" align="center" label="状态" width="120">
        <template #default="scope">
          <el-tag class="ml-2" :type="scope.row.status ? 'success' : 'danger'">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="菜单" width="240">
        <template #default="scope">
          <el-button
            size="small"
            v-auth="'edit'"
            @click="openDrawer('修改', scope.row)"
          >
            修改
          </el-button>
          <el-button
            size="small"
            type="primary"
            v-auth="'show'"
            @click="openDrawer('查看', scope.row)"
          >
            查看
          </el-button>
          <el-button
            size="small"
            type="danger"
            v-auth="'delete'"
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
    <myDialog ref="myDialogRef" @getInfo="getInfo"></myDialog>
  </el-card>
</template>

<script setup name="user">
import { onMounted, ref } from 'vue'
import { getList } from '@/api/userList.js'
import { del } from '@/api/user.js'
import myDialog from './component/myDialog.vue'
import { getData } from '@/utils'
import { Search } from '@element-plus/icons-vue'
import tableHooks from '@/hooks/tableHooks'

const keyWord = ref('')
const myDialogRef = ref() // 新增或修改Ref

// 使用自定义hook函数
// 封装表格方法
const { getInfo, tableData, total, loading, handleDelete, listData, getPage } =
  tableHooks({ getList, del })

// 打开查看、编辑、新增Drawer
const openDrawer = (text, row = {}) => {
  let pramas = {
    text,
    row,
  }
  // 携带表格数据
  myDialogRef.value.getPresonData(pramas)
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
  padding: 20px 0 50px;
  display: flex;

  .el-button {
    margin-right: 20px;
  }
}
</style>