/**
 * 标签操作主体，继承简写基本标签能力
 */
import { getCache, setCache } from "./JElementCache";
import { labelContentRegular, attrFormat, styleFormat, cssCompose, labelFormat, isEmpty, hasOwn, downlevelIteration, push, hasOwnProperty } from "./JElementUtils";
import { forEach } from "./JElementStatic";

import { ElementSelector, ElementOptions } from "./JElementTyper";
export class JElementObject {
  length: any = 0;
  document: Document | HTMLElement | Array<HTMLElement> = window.document;
  private options: any;
  parent: any;

  constructor(selector: ElementSelector, options?: ElementOptions | any, parent?: any) {
    this.parent = parent;
    this.options = options;
    this.init(selector, options);
  }

  addElement(target: HTMLElement | Array<HTMLElement> | JElementObject | any) {
    if (isEmpty(this.length)) {
      this.length = 0;
    }

    if (hasOwnProperty(target, "length")) {
      const self = this;
      forEach(target, function (el: any) {
        self[self.length++] = el;
      });
    } else {
      this[this.length++] = target;
    }
    return this.render();
  }

  private init(selector: ElementSelector, options?: ElementOptions | any) {
    if (isEmpty(this.document)) {
      this.document = window.document;
    }
    if (!selector) {
      return;
    }
    if (typeof selector === "string") {
      if (labelContentRegular.test(selector)) {
        this.create(selector);
      } else {
        this.init((this.document as Document).querySelectorAll(selector));
      }
      this.options = Object.assign(options || {}, labelFormat(selector));
    } else if (hasOwnProperty(selector, "length") || selector instanceof HTMLElement) {
      this.addElement(selector);
    } else if (selector instanceof JElementObject) {
      return selector;
    }
  }

  find(selector: string): JElementObject {
    const document: any[] = [];
    const data: any[] = [];

    this.forEach(function (el: HTMLElement) {
      push.apply(data, el.querySelectorAll(selector));
      document.push(el);
    });

    return new JElementObject(
      data,
      {
        ...this.options,
        selector: `${this.options.selector} ${selector}`,
      },
      document
    );
  }

  create(labelName: string, options?: ElementOptions | any) {
    if (isEmpty(labelName)) {
      return this.render();
    }
    if (isEmpty(options)) {
      options = labelFormat(labelName);
      if (options["tab"]) {
        labelName = options["tab"];
      }
    }
    this.addElement(document.createElement(labelName));
    options["style"] && this.css(options["style"]);
    options["className"] && this.setClass(options["className"]);
    options["attr"] && this.attr(options["attr"]);
    options["id"] && this.attr("id", options["id"]);

    return this.render();
  }

  render(): JElementObject {
    return this;
  }

  eq(index?: number): JElementObject {
    return new JElementObject(this.at(index));
  }

  at(index?: number): HTMLElement {
    if (this.length >= (index || 0)) {
      return this[index || 0];
    }
    return undefined;
  }

  lastAt(): HTMLElement {
    if (this.length) {
      return this[this.length - 1];
    }
    return undefined;
  }

  forEach(callback: any): JElementObject {
    for (let i = 0; i < this.length; i++) {
      callback.call(this, this[i] as HTMLElement, i, this);
    }
    return this.render();
  }

  css(key: any, value?: string): string | JElementObject {
    if (isEmpty(key)) {
      return this.render();
    }
    if (value) {
      this.forEach(function (el: HTMLElement) {
        const structure = {};
        styleFormat(el.getAttribute("style"), structure);
        structure[key] = value;
        el.setAttribute("style", cssCompose(structure));
      });
    } else {
      const _structure = {};
      const data = styleFormat(key, _structure);
      if (Object.keys(_structure).length) {
        this.forEach(function (el: HTMLElement) {
          const structure = {};
          styleFormat(el.getAttribute("style"), structure);
          Object.assign(structure, _structure);
          el.setAttribute("style", cssCompose(structure));
        });
      } else {
        const structure = {};
        styleFormat(this.at(0).getAttribute("style"), structure);
        return structure[data] || "";
      }
    }

    return this.render();
  }

  removeCss(keys: string | Array<string>): JElementObject {
    if (isEmpty(keys)) {
      return this.render();
    }
    if (typeof keys === "string") {
      this.forEach(function (el: HTMLElement) {
        const structure = {};
        styleFormat(el.getAttribute("style"), structure);
        delete structure[keys];
        el.setAttribute("style", cssCompose(structure));
      });
    } else {
      this.forEach(function (el: HTMLElement) {
        keys.forEach((key) => {
          const structure = {};
          styleFormat(el.getAttribute("style"), structure);
          delete structure[key];
          el.setAttribute("style", cssCompose(structure));
        });
      });
    }
    return this.render();
  }

  attr(key: any, value?: string): JElementObject | string {
    const self = this;

    if (isEmpty(key)) {
      return this.render();
    }

    if (value) {
      this.forEach(function (el: HTMLElement) {
        if (hasOwn.call(el, key)) {
          el[key] = value;
        } else {
          el.setAttribute(key, value);
        }
      });
    } else {
      const data = attrFormat(key);
      if (typeof data === "string") {
        return this.at(0).getAttribute(key);
      } else {
        Object.keys(data).forEach(function (key) {
          self.attr(key, data[key]);
        });
      }
    }
    return this.render();
  }

  removeAttr(keys: string | Array<string>): JElementObject {
    if (isEmpty(keys)) {
      return this.render();
    }
    if (typeof keys === "string") {
      this.forEach(function (el: HTMLElement) {
        el.removeAttribute(keys);
      });
    } else {
      this.forEach(function (el: HTMLElement) {
        keys.forEach((key) => {
          el.removeAttribute(key);
        });
      });
    }
    return this.render();
  }

  getClass(el?: HTMLElement): string[] {
    if (el) {
      return (el.className || el.getAttribute("class"))?.split(" ") || [];
    }
    return this.getClass(this.at());
  }

  setClass(className: string | Array<string>, el?: HTMLElement): JElementObject {
    if (isEmpty(className)) {
      return this.render();
    }

    if (isEmpty(el)) {
      el = this.at();
    }

    if (typeof className === "string") {
      if (hasOwn.call(el, "className")) {
        el.className = className;
      } else {
        el.setAttribute("class", className);
      }
    } else {
      if (hasOwn.call(el, "className")) {
        el.className = className.join(" ");
      } else {
        el.setAttribute("class", className.join(" "));
      }
    }
    return this.render();
  }

  addClass(value: string | Array<string>): JElementObject {
    if (isEmpty(value)) {
      return this.render();
    }
    this.forEach(function (el: HTMLElement) {
      const calssList = this.getClass(el);
      if (typeof value === "string") {
        push.call(calssList, value);
      } else {
        push.apply(calssList, value);
      }
      this.setClass(calssList, el);
    });
    return this.render();
  }

  removeClass(value: string | Array<string>, displace?: string): JElementObject {
    if (isEmpty(value)) {
      return this.render();
    }
    this.forEach(function (el: HTMLElement) {
      const calssList = this.getClass(el);
      if (typeof value === "string") {
        const index = calssList.findIndex((item: string) => item == value);
        calssList.splice(index, 1, displace || "");
      } else {
        value.forEach((_class) => {
          const index = calssList.findIndex((item: string) => item == _class);
          calssList.splice(index, 1, displace || "");
        });
      }
      this.setClass(calssList, el);
    });
    return this.render();
  }

  show(): JElementObject {
    const display = this.attr("effect-display") as string;
    this.css({
      display: display,
    });
    return this.render();
  }

  hide(): JElementObject {
    const display = this.css("display") as string;
    if (display) {
      this.attr("effect-display", display);
    }
    this.css({
      display: "none",
    });
    return this.render();
  }

  val(value?: string): JElementObject | string {
    const el = this.at();
    if (el.tagName == "input".toUpperCase()) {
      if (!value) {
        return (el as HTMLInputElement).value;
      }
      (el as HTMLInputElement).value = value;
    } else if (el.tagName == "TextArea".toUpperCase()) {
      if (!value) {
        return (el as HTMLTextAreaElement).value;
      }
      (el as HTMLTextAreaElement).value = value;
    } else if (el.tagName == "select".toUpperCase()) {
      if (!value) {
        return (el as HTMLSelectElement).value;
      }
      (el as HTMLSelectElement).value = value;
    } else {
      if (!value) {
        return el.nodeValue;
      }
      el.nodeValue = value;
    }
    return this.render();
  }

  // eslint-disable-next-line no-unused-vars
  on<E extends Event>(event: string, callback?: (event: E) => void): JElementObject {
    const that = this;
    this.forEach(function (el: any) {
      const handle = setCache(el, event, function (...arg: any[]) {
        callback?.apply(that, downlevelIteration(arg, el, that));
      });

      el.addEventListener(event, handle);
    });
    return this.render();
  }

  off(event: string, keys?: string): JElementObject {
    this.forEach(function (el: any) {
      const handle = getCache(el, keys || event);
      el.removeEventListener(event, handle);
    });
    return this.render();
  }

  // eslint-disable-next-line no-unused-vars
  one<E extends Event>(event: string, callback?: (event: E) => void): JElementObject {
    this.forEach(function (el: any, index: number, that: any) {
      const handle = setCache(el, `one-${event}`, function (...arg: any[]) {
        callback?.apply(that, downlevelIteration(arg, el, that));
        that.eq(index).off(event, `one-${event}`);
      });
      el.addEventListener(event, handle);
    });
    return this.render();
  }

  height(): number {
    return this.at(0).clientHeight;
  }

  scrollHeight(): number {
    return this.at(0).scrollHeight;
  }

  offsetHeight(): number {
    return this.at(0).offsetHeight;
  }

  width(): number {
    return this.at(0).clientWidth;
  }

  scrollWidth(): number {
    return this.at(0).scrollWidth;
  }
  offsetWidth(): number {
    return this.at(0).offsetWidth;
  }

  append(target: string | HTMLElement | Array<HTMLElement> | JElementObject): JElementObject {
    const element = this.lastAt();
    if (element) {
      new JElementObject(target).forEach(function (el: HTMLElement) {
        if (element.appendChild) {
          element.appendChild(el);
        }
      });
    }
    return this.render();
  }

  appendTo(target: string | HTMLElement | Array<HTMLElement> | JElementObject): JElementObject {
    const element = new JElementObject(target).lastAt();
    if (element) {
      if (element.appendChild) {
        this.forEach(function (el: HTMLElement) {
          element.appendChild(el);
        });
      }
    }
    return this.render();
  }
}
export default JElementObject;
