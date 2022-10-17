import { onMounted, reactive, ref } from 'vue';

export default function tableHooks(api) {

  const addUpload = ref(); // 上传组件Ref
  // 获取列表条数和当前页数
  const listData = reactive({
    pageNo: 1,
    pageSize: 10
  })
  const total = ref(0);  // 表格数据总数
  const tableData = ref([]); // 表格数据
  const loading = ref(false); // 加载

  // 获取表格信息
  const getInfo = async () => {
    loading.value = true
    const result = await api.getList(listData);
    if (result.code == 200) {
      loading.value = false

      // 如果有图片处理一下路径
      if (result.data[0] && result.data[0].img) {
        tableData.value = result.data.map(item => {
          item.img = import.meta.env.VITE_API_URL + item.img
          return item
        });
      } else {
        tableData.value = result.data;
      }
      total.value = result.total;
    }
  }
  // 获取分页组件的当前页数和每页显示的数量
  const getPage = (pageNo, pageSize) => {
    // console.log(pageNo, pageSize);
    listData.pageNo = pageNo;
    listData.pageSize = pageSize;
    getInfo()
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
    addUpload,
    total,
    loading,
    listData,
    getPage
  }
}