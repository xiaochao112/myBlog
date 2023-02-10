<template>
  <el-table
    :data="secondTag"
    border
    :default-sort="{ prop: 'date', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column type="index" label="序号" align="center" width="60" />
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
    <!-- <el-table-column prop="typeId" label="类型" width="120" /> -->
    <el-table-column prop="desc" label="备注" />

    <el-table-column align="center" label="菜单" width="240">
      <template #default="scope">
        <el-button
          size="small"
          v-auth="'edit'"
          @click="emit('handleSecondEdit', scope.$index, scope.row)"
        >
          修改
        </el-button>
        <el-button
          size="small"
          v-auth="'edit'"
          type="primary"
          @click="emit('showContent', scope.$index, scope.row)"
        >
          编辑内容
        </el-button>
        <el-button
          size="small"
          v-auth="'delete'"
          type="danger"
          @click="emit('handleSecondDelete', scope.$index, scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref } from 'vue'
import { getData } from '@/utils'
import tableHooks from '@/hooks/tableHooks'
import MyDialog from './component/myDialog.vue'

const emit = defineEmits([
  'handleSecondEdit',
  'handleSecondDelete',
  'showContent',
])

const props = defineProps({
  secondTag: { type: Array },
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