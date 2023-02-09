import { PersistedStateOptions } from "pinia-plugin-persistedstate";

/**
 * @description pinia持久化参数配置
 * @param {String} key 存储到持久化的name
 * @return persist
 */

export const localiniaPersistConfig = (key: string) => {
  const persist: PersistedStateOptions = {
    key,
    storage: window.localStorage
  };
  return persist;
};

/**
 * @description pinia临时存储参数配置
 * @param {String} key 存储到临时仓库的name
 * @return persist
 */

export const sessionPiniaPersistConfig = (key: string) => {
  const persist: PersistedStateOptions = {
    key,
    storage: window.sessionStorage
  };
  return persist;
};