import http from "./index";
// 上传图片
export const uploadImg = (data) => {
  return http.post('/upload/picture', data);
}

// 上传Excel
export const excelUpload = (data) => {
  return http.post('/upload/import', data);
}