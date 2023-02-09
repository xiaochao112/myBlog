


// 设置时间格式
export function getData(n: number) {
  let date = new Date(n * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() + '-';
  let h = date.getHours() + ':';
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return Y + M + D + h + m;
}