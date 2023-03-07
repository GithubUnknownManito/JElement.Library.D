import JElementObject from "./JElementObject";
export type ElementSelector = string | HTMLElement | Array<HTMLElement> | JElementObject | NodeListOf<any>;
export type ElementOptions = {
  tab?: string;
  id?: string;
  attr?: any | string;
  style?: any | string;
  className?: string | Array<string>;
  selector?: string;
};
