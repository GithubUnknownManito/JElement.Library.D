/**
 * 传导索引对象（仅在ts语法中生效，js中视为存在对等key关系的JSON对象）
 */
export default class ElementOptions {
    tab: string;
    id: string;
    attr: any | string;
    style: any | string;
    className: string | Array<string>;
    selector: string;
}
