/**
 * 外部暴露的基本功能
 * 同内部工具使用
 */
import { isEmpty, hasOwnProperty } from "./JElementUtils";
import JElementObject from "./JElementObject";
import ElementOptions from "./JElementOptions";

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

export function createElement(labelName: string, options?: ElementOptions): HTMLElement {
  return createJElement(labelName, options).at(0);
}

export function createJElement(labelName: string, options?: ElementOptions): JElementObject {
  return new JElementObject(labelName, options);
}

export default {};
