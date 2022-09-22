/**
 * @description pinia持久化参数配置
 * @param {String} key 存储到持久化的name
 * @return persist
 */

export const piniaLocalStorage = (key) => {
  const persist = {
    key,
    storage: window.localStorage
  };
  return persist;
}

/**
 * @description pinia临时存储参数配置
 * @param {String} key 临时存储的name
 * @return persist
 */

export const piniaSessionStorage = (key) => {
  const persist = {
    key,
    storage: window.sessionStorage
  };
  return persist;
}