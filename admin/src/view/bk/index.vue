<template>
  <div class="bk">
    <!-- 富文本编辑器 -->
    <WangEditor height="500px" v-model:value="ruleForm.content"></WangEditor>
    <el-card>
      <el-form ref="ruleFormRef" :model="ruleForm" label-position="top" :rules="rules" class="demo-ruleForm"
        :size="formSize" status-icon>
        <el-form-item label="文档标题" prop="title">
          <el-input v-model="ruleForm.title" />
        </el-form-item>
        <el-form-item label="类型：" prop="typeId">
          <el-select v-model="ruleForm.typeId" placeholder="选择类型">
            <el-option v-for="item in dataList" :key="item.typeId" :label="item.title" :value="item.typeId"
              :disabled="item.disabled" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">内容预览</el-button>
          <el-button @click="resetForm(ruleFormRef)">清除</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 预览 -->
    <el-dialog v-model="dialogVisible" title="内容预览" width="1000px" top="50px">
      <h3 v-if="false">{{ ruleForm.typeId }}</h3>
      <el-descriptions title="" :column="2" style="width: 400px">
        <el-descriptions-item label="文章名称">
          <el-tag size="small">{{ ruleForm.title }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="类型">
          <el-tag size="small">{{ currentFristTag.title }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="备注">
          <el-tag size="small">{{ ruleForm.desc }}</el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <div class="view" v-html="ruleForm.content"></div>
      <div>
        <el-button type="primary" @click="setBkPublish">发表</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import WangEditor from "@/components/WangEditor/index.vue";
import BkDetail from './component/BkDetail/index.vue';
import { onBeforeMount, reactive, ref, watch } from "vue";
import bkHooks from '@/hooks/bkHooks';
import { getList } from '@/api/tag.js';
import { add, update } from '@/api/tagItem.js';
import { bkStore } from '@/store/modules/bkStore';
import { useRoute } from 'vue-router';

const state = bkStore();

const route = useRoute();
const { setBkPublish, currentFristTag, ruleForm, dialogVisible, getInfo, dataList, updatedContent } = bkHooks({ getList, add, update });

const formSize = ref('default');
const ruleFormRef = ref();

const rules = reactive({
  title: [
    { required: true, message: '不能为空', trigger: 'blur' },
  ],
  typeId: [
    {
      required: true,
      message: '不能为空',
      trigger: 'change',
    },
  ]
})
// 根据路由是否携带二级标签_id来判断是否为编辑或添加状态
watch(route, (newValue) => {
  if (!newValue.query._id) return
  updatedContent(newValue.query);
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      dialogVisible.value = true;
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  state.setBkIformation({});
  // formEl.resetFields();
}

onBeforeMount(() => {
  getInfo();
  if (state.bkIformation._id) {
    ruleForm._id = state.bkIformation._id;
    ruleForm.title = state.bkIformation.title;
    ruleForm.typeId = state.bkIformation.typeId;
    ruleForm.desc = state.bkIformation.desc;
    ruleForm.content = state.bkIformation.content;
  }
});

</script>


<style lang="scss" scoped>
.bk {
  display: flex;
  justify-content: space-around;
}
</style>