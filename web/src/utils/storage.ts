
export const setItem = (key: string, value: any) => {
  return localStorage.setItem(key, value);
}

export const getItem = (key: string) => {
  return localStorage.getItem(key) || '';
}
export const delItem = (key: string) => {
  return localStorage.removeItem(key);
}