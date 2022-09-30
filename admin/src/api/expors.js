import http from "./index";

export const download = () => {
  return http.get('/excel/download');
}