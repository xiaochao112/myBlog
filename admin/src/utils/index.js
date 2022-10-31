
export function localGet(key) {
  const value = window.localStorage.getItem(key)
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (error) {
    return value
  }
}

export function localSet(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function localRemove(key) {
  window.localStorage.removeItem(key)
}

// 设置时间格式
export function getData(n) {
  let date = new Date(n * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() + '-';
  let h = date.getHours() + ':';
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return Y + M + D + h + m;
}

/**
 * @description 使用递归处理路由菜单，生成一维数组
 * @param {Array} routerList 路由集合
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */

export function handleRouter(routerList, roleId = 2,) {
  const newArr = []
  let tem = {}
  routerList.forEach(item => {
    tem = { ...item }
    console.log(tem.meta && tem.meta['role'] && tem.meta['role'].includes(roleId));
    if (tem.meta && tem.meta['role'] && tem.meta['role'].includes(roleId)) {
      if (tem.children && tem.children.length) {
        handleRouter(tem.children)
      }
      newArr.push(tem)
    };

  });

  return newArr;
}
/**
 * @description 校验权限路由导航
 * @param {Array}  权限id
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */