/**
 * 外部暴露的基本功能
 * 同内部工具使用
 */
import { isEmpty, hasOwnProperty } from "./JElementUtils";
import JElementObject from "./JElementObject";

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

export function createElement(labelName: string) {
  return new JElementObject(labelName, null).at(0);
}

export default {};
