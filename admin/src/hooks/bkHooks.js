import { ref, reactive, computed } from "vue";
import { bkStore } from '@/store/modules/bkStore';

/**
 * @description bkHooks 博客发表hook封装
 * @param {Function} api 获取资料卡数据 api 方法(必传)
 * @param {Object} initParam 获取数据初始化参数(非必传，默认为{})
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法(非必传)
 * */
export default function bkHooks(api) {

  const state = bkStore();

  const content = ref('');
  const dialogVisible = ref(false);
  // 初始化列表信息
  const dataList = ref([]);
  const ruleForm = reactive({
    _id: '',
    title: 'hello',
    typeId: 19,
    // type: [],
    desc: '',
    // 富文本编辑器内容
    content: ''
  })
  // 当前一级标签(类型)
  const currentFristTag = computed(() => {
    return dataList.value.find(item => item.typeId == ruleForm.typeId);
  });

  // 初始化表单信息
  const getInfo = async () => {
    const { data } = await api.getList();
    dataList.value = data;
    console.log(dataList.value);
  }

  // 更新博客发表
  const updatedContent = (secondTag) => {
    const { content, desc, title, typeId, _id } = secondTag;
    ruleForm._id = _id;
    ruleForm.title = title;
    ruleForm.content = content;
    ruleForm.desc = desc;
    ruleForm.typeId = typeId;

  }
  // 发表博客()
  const setBkPublish = () => {
    if (!ruleForm._id) {
      const { content, desc, title, typeId, } = ruleForm;
      api.add({ content, desc, title, typeId, }).then(res => {
        ElMessage({
          message: '发表成功',
          type: 'success',
        })
        dialogVisible.value = false;
      })
        .catch(err => {
          console.log(err);
        })
    } else {
      api.update(ruleForm).then(res => {
        ElMessage({
          message: '编辑成功',
          type: 'success',
        })
        state.setBkIformation(ruleForm);
        dialogVisible.value = false;
      })
        .catch(err => {
          console.log(err);
        })
    }
  }

  return {
    setBkPublish,
    getInfo,
    dataList,
    content,
    dialogVisible,
    ruleForm,
    currentFristTag,
    updatedContent
  }

}