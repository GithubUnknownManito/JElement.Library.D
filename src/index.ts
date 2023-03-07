import JElement from "./lib/JElement";
export { JElementObject } from "./lib/JElementObject";
export { createElement, createJElement } from "./lib/JElementStatic";
export { ElementSelector, ElementOptions } from "./lib/JElementTyper";

export default JElement;

export function extend(...arg: any[]) {
  JElement.fn.extend.apply(this, arg);
}
export function staticExtend(...arg: any[]) {
  JElement.extend.apply(this, arg);
}
