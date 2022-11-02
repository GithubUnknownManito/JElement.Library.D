/**
 * 外部暴露的基本功能
 * 同内部工具使用
 */
import { isEmpty, hasOwnProperty } from "./JElementUtils";
export function forEach(array: any, callback: any) {
  if (isEmpty(array)) {
    return array;
  }
  if (!Array.isArray(array)) {
    if (!hasOwnProperty(array, "length")) {
      return array;
    }
  }
  for (let i = 0; i < array.length; i++) {
    callback.call(this, array[i], i);
  }
  return array;
}

export default {};
