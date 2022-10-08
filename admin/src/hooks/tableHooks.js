import { onMounted, reactive, ref } from 'vue';

export default function tableHooks(api) {

  // 上传组件
  const addUpload = ref();
  // 获取列表条数和当前页数
  const listData = reactive({
    pageNo: 1,
    pageSize: 10
  })
  // 列表信息
  const tableData = ref([]);

  // 获取列表信息
  const getInfo = async () => {
    const result = await api.getInfoApi(listData);
    if (result.code) {
      tableData.value = result.data;
      console.log(tableData.value);
    }
  }

  // 上传excel文件
  const handleExcelUpload = (file) => {
    if (file) {
      const tempArray = file.name.split('.')
      const len = tempArray.length
      const suffix = tempArray[len - 1]

      if (suffix != 'xlsx' && suffix != 'xls') {
        ElMessage({
          message: '请上传excel文件',
          type: 'error',
        })
        addUpload.value.clearFiles();
      } else {
        let formData = new FormData();
        formData.append("avatar", file);
        api.excelUpload(formData)
          .then((res) => {
            if (res.code === 200) {
              ElMessage({
                message: res.msg,
                type: 'success',
              })
              getInfo()
            } else {
              ElMessage({
                message: res.msg,
                type: 'error',
              })
            }
          })
          .catch((err) => {
            ElMessage({
              message: err,
              type: 'error',
            })
          });
        return false; //阻止图片继续上传，使得form表单提交时统一上传
      }
    }
    return false;
  };
  // 删除单条信息
  const handleDelete = (index, row) => {
    let _id = row._id
    api.del({ _id }).then(res => {
      ElMessage({
        message: '删除成功',
        type: 'success',
      })
      getInfo()
    })
      .catch(err => {
        console.log(err);
      })
  }

  return {
    handleExcelUpload,
    getInfo,
    tableData,
    handleDelete,
    addUpload
  }
}