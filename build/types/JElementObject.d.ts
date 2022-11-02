import ElementOptions from "./JElementOptions";
export default class JElementObject {
    length: any;
    document: Document | HTMLElement | Array<HTMLElement>;
    options: any;
    parent: any;
    constructor(selector: string | HTMLElement | Array<HTMLElement> | JElementObject, options?: ElementOptions | any, parent?: any);
    init(selector: string, options?: ElementOptions | any): void;
    create(labelName: string, options?: ElementOptions | any): JElementObject;
    css(key: any, value?: string): string | JElementObject;
    removeCss(keys: string | Array<string>): JElementObject;
    attr(key: any, value?: string): string | JElementObject;
    removeAttr(keys: string | Array<string>): JElementObject;
    getClass(el?: HTMLElement): string[];
    setClass(className: string | Array<string>, el?: HTMLElement): JElementObject;
    addClass(value: string | Array<string>): JElementObject;
    removeClass(value: string | Array<string>, displace?: string): JElementObject;
    eq(index?: number): JElementObject;
    at(index?: number): HTMLElement | any;
    forEach(callback: any): void;
    show(): JElementObject;
    hide(): JElementObject;
    render(): JElementObject;
    find(selector: string): JElementObject;
    val(value?: string): any;
    on(event: string, callback?: any): JElementObject;
    off(event: string, keys?: string): JElementObject;
    one(event: string, callback?: any): JElementObject;
}
