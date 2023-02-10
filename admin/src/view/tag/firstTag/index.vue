<template>
  <el-card class="box-card">
    <div class="header_box">
      <div>
        <el-button type="primary" v-auth="'add'" @click="addForm">
          新增一级标签 +
        </el-button>
        <!-- <el-button type="primary"> 上传 </el-button> -->
        <!-- <el-button>
          <el-link href="#">导出</el-link>
        </el-button> -->
        <el-button type="primary" v-auth="'add'" @click="addSecondTagForm">
          新增二级标签 +
        </el-button>
      </div>
      <el-input
        style="width: 150px; margin-left: 50px"
        placeholder="搜索"
        :suffix-icon="Search"
      />
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%"
    >
      <el-table-column type="expand" width="80%">
        <template #default="props">
          <!-- 二级标签表格 -->
          <secondTag
            :secondTag="props.row.secondtags"
            @handleSecondEdit="handleSecondEdit"
            @handleSecondDelete="handleSecondDelete"
            @showContent="showContent"
          ></secondTag>
        </template>
      </el-table-column>

      <!-- <el-table-column type=index label="序号" align="center" width="60" /> -->
      <el-table-column
        prop="title"
        label="一级标签"
        align="center"
        width="120"
      />
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
      <el-table-column prop="promise" label="是否重要" width="120">
        <template #default="scope">
          <el-tag class="ml-2">{{ scope.row.promise }}</el-tag>
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
          <el-button size="small" type="primary" v-auth="'show'">
            查看
          </el-button>
          <el-button
            size="small"
            v-auth="'delete'"
            type="danger"
            @click="emit('handleDelete', scope.$index, scope.row)"
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

    <!-- 一级标签添加、修改对话框 -->
    <firstDialog
      ref="firstDialogRef"
      :title="title"
      @getInfo="emit('getInfo')"
    ></firstDialog>
    <!--  -->
    <!-- 二级标签添加、修改对话框 -->
    <SecondTagDialog
      ref="SecondTagDialogRef"
      :title="title"
      @getInfo="emit('getInfo')"
    ></SecondTagDialog>
  </el-card>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getData } from '@/utils'
import { del } from '@/api/tagItem.js'
import { Search } from '@element-plus/icons-vue'
import firstDialog from './component/firstDialog.vue'
import secondTag from '../secondTag/index.vue'
import SecondTagDialog from '../secondTag/component/myDialog.vue'
import router from '@/router/index.js'
import { bkStore } from '@/store/modules/bkStore'

const state = bkStore()

const title = ref('')
const firstDialogRef = ref() // 一级标签对话框ref
const SecondTagDialogRef = ref() // 二级标签对话框ref
// const fristNumberValidateForm = ref({})
const emit = defineEmits(['getInfo', 'handleDelete', 'getPage'])

const props = defineProps({
  tableData: { type: Array },
  loading: { type: Boolean },
  listData: { type: Object },
  total: { tyoe: Number },
})
const getPage = (pageNo, pageSize) => {
  emit('getPage', pageNo, pageSize)
}
// * 一级标签
// 新增一条数据
const addForm = () => {
  title.value = '新增'
  firstDialogRef.value.centerDialogVisible = true
}
// 修改某一条数据
const handleEdit = (index, row) => {
  title.value = '修改'
  firstDialogRef.value.centerDialogVisible = true
  // 表单数据渲染
  // fristNumberValidateForm = { promise: row.promise, _id: row._id, title: row.title, desc: row.desc }
  firstDialogRef.value.numberValidateForm.promise = row.promise
  firstDialogRef.value.numberValidateForm._id = row._id
  firstDialogRef.value.numberValidateForm.title = row.title
  firstDialogRef.value.numberValidateForm.desc = row.desc
}

// * 二级标签
// 新增数据
const addSecondTagForm = () => {
  title.value = '新增'
  SecondTagDialogRef.value.centerDialogVisible = true
}
// 修改数据
const handleSecondEdit = (index, row) => {
  console.log(index, row)
  title.value = '修改'
  SecondTagDialogRef.value.centerDialogVisible = true
  // 表单数据渲染
  SecondTagDialogRef.value.numberValidateForm._id = row._id
  SecondTagDialogRef.value.numberValidateForm.typeId = row.typeId
  SecondTagDialogRef.value.numberValidateForm.title = row.title
  SecondTagDialogRef.value.numberValidateForm.desc = row.desc
}
// 删除数据
const handleSecondDelete = (index, row) => {
  console.log(index, row)
  let _id = row._id
  del({ _id })
    .then((res) => {
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
      emit('getInfo')
    })
    .catch((err) => {
      console.log(err)
    })
}
// 编辑二级标签内容
const showContent = (index, row) => {
  console.log(index, row)
  state.setBkIformation(row)
  router.push({ name: 'bkIndex' })
}
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