/**
 * 工具包
 * ts可以被引用
 * js下将不会被主动暴露（dev
 */
import { ElementOptions } from "./JElementTyper";

export const labelContentRegular = /<([^/]+)>/;
export const styleRegular = /([^:]+:[^;]+;{0,1})+/;
export const getProto = Object.getPrototypeOf;
export const hasOwn = {}.hasOwnProperty;
export const push = [].push;
export const fnToString = hasOwn.toString;
export const ObjectFunctionString = fnToString.call(Object);

export function attrFormat(val: string | any): string | any {
  if (typeof val == "string") {
    if (styleRegular.test(val)) {
      const json = {};
      val
        .split(";")
        .filter((item) => item)
        .forEach((item) => {
          const tmp = item.split(":");
          if (tmp && tmp.length) {
            json[tmp[0]] = tmp[1];
          }
        });
      return json;
    } else {
      return val;
    }
  }
  return val;
}

export function styleFormat(value: any, structure: any): string | any {
  if (typeof value == "string") {
    const style = attrFormat(value);
    if (typeof style == "string") {
      return style;
    } else {
      Object.assign(structure, style);
      return value;
    }
  } else {
    let style = "";
    Object.keys(Object.assign(structure, value)).forEach((item) => {
      let key = item;
      item.match(/[A-Z]/)?.forEach((U) => {
        key = key.replace(U, `-${U}`.toLowerCase());
      });
      style += `${item}:${value[item]}`;
    });
    return style;
  }
}

export function cssCompose(data: any): string {
  let style = "";
  Object.keys(data).forEach((key) => {
    let keyText = key;
    let result: RegExpExecArray;
    if (style) {
      style += "; ";
    }
    do {
      result = /[A-Z]/g.exec(keyText);
      if (result) {
        keyText = `${keyText.substring(0, result.index)}-${result[0].toLowerCase()}${keyText.substring(result.index + 1)}`;
      }
    } while (result);
    style += `${keyText}: ${data[key]}`;
  });
  return style;
}

export function labelFormat(value: string): ElementOptions {
  const data = value.match(labelContentRegular);
  if (data && data.length) {
    const options: ElementOptions = {};
    if (data[1].indexOf(" ") > 0) {
      options.tab = data[1].substring(0, data[1].indexOf(" "));
    } else {
      options.tab = data[1];
    }

    const attrList = data[1].match(/(([a-zA-Z0-9_-]+)=(['"]([^'"]+)['"]))/g);
    if (attrList && attrList.length >= 1) {
      for (let i = 0; i < attrList.length; i++) {
        const attr = attrList[i].split("=");
        if (attr && attr.length == 2) {
          if (attr[0] === "style") {
            options.style = attr[1].replace(/['"]/g, "");
          } else if (attr[0] === "class") {
            options.className = attr[1].replace(/['"]/g, "");
          } else if (attr[0] === "id") {
            options.id = attr[1].replace(/['"]/g, "");
          } else {
            if (isEmpty(options.attr)) {
              options.attr = {};
            }
            options.attr[attr[0]] = attr[1].replace(/['"]/g, "");
          }
        }
      }
    }
    return options;
  } else {
    return {
      selector: value,
    };
  }
}

export function isFunction(obj: any): boolean {
  // Support: Chrome <=57, Firefox <=52
  // In some browsers, typeof returns "function" for HTML <object> elements
  // (i.e., `typeof document.createElement( "object" ) === "function"`).
  // We don't want to classify *any* DOM node as a function.
  // Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
  // Plus for old WebKit, typeof returns "function" for HTML collections
  // (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
  return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
}

export function isPlainObject(obj: any): boolean {
  // Detect obvious negatives
  // Use toString instead of jQuery.type to catch host objects
  if (!obj || toString.call(obj) !== "[object Object]") {
    return false;
  }

  const proto = getProto(obj);

  // Objects with no prototype (e.g., `Object.create( null )`) are plain
  if (!proto) {
    return true;
  }

  // Objects with prototype are plain iff they were constructed by a global Object function
  const Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
}

export function isEmpty(value: any): boolean {
  if (value == null || value == undefined) {
    return true;
  }
  if (typeof value === "number" || value instanceof Number) {
    return isNaN(Number(value));
  } else if (typeof value === "string" || value instanceof String || Array.isArray(value)) {
    return !value.length;
  } else {
    return isEmpty(Object.keys(value));
  }
}

export function hasOwnProperty(obj: any, key: any): boolean {
  if (hasOwn.call(obj, key)) {
    return true;
  } else {
    return !isEmpty(obj[key]);
  }
}

export function downlevelIteration(...args: any[]): any[] {
  const array: any[] = [];
  const length = args.length;
  for (let i = 0; i < length; i++) {
    const el = args[i];
    if (Array.isArray(el)) {
      push.apply(array, el);
    } else {
      if (hasOwnProperty(el, "length")) {
        for (let j = 0; j < el.length; j++) {
          array.push(el[j]);
        }
      } else {
        array.push(el);
      }
    }
  }
  return array;
}
