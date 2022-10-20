<template>
  <div class="bk">
    <WangEditor height="500px" v-model:value="content"></WangEditor>

    <el-card>
      <el-form ref="form" :model="sizeForm" label-width="auto" label-position="top">
        <el-form-item label="文章标题：">
          <el-input v-model="sizeForm.name" />
        </el-form-item>
        <el-form-item label="类型：">
          <el-select v-model="sizeForm.value" placeholder="选择类型">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
              :disabled="item.disabled" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否摘要：">
          <el-checkbox-group v-model="sizeForm.type">
            <el-checkbox-button label="是" name="type" />
            <el-checkbox-button label="否" name="type" />
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="showContent">内容预览</el-button>
    </el-card>

    <!-- 预览 -->
    <el-dialog v-model="dialogVisible" title="富文本内容预览" width="1000px" top="50px">
      <el-descriptions title="">
        <el-descriptions-item label="文章名称">
          <el-tag size="small">{{ sizeForm.name }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="类型">
          <el-tag size="small">{{ sizeForm.value }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <div class="view" v-html="content"></div>
    </el-dialog>
  </div>
</template>

<script setup>
import WangEditor from "@/components/WangEditor/index.vue";
import BkDetail from './component/BkDetail/index.vue';
import { onMounted, reactive, ref } from "vue";

const dialogVisible = ref(false);
const content = ref(''); // 富文本编辑器内容

const sizeForm = reactive({
  name: '',
  type: [],
  desc: '',
  value: ''
})
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
    disabled: true,
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

const showContent = () => {
  dialogVisible.value = true
}

function onSubmit() {
  console.log('submit!')
}
</script>


<style lang="scss" scoped>
.bk {
  display: flex;
  justify-content: space-around;
}
</style>