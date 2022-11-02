/**
 * 工具包
 * ts可以被引用
 * js下将不会被主动暴露（dev
 */
import ElementOptions from "./JElementOptions";
export declare const labelContentRegular: RegExp;
export declare const styleRegular: RegExp;
export declare const getProto: (o: any) => any;
export declare const hasOwn: (v: PropertyKey) => boolean;
export declare const push: (...items: undefined[]) => number;
export declare const fnToString: () => string;
export declare const ObjectFunctionString: any;
export declare function attrFormat(val: string | any): string | any;
export declare function styleFormat(value: any, structure: any): string;
export declare function cssCompose(data: any): string;
export declare function labelFormat(value: string): ElementOptions | {
    selector: string;
};
export declare function isFunction(obj: any): boolean;
export declare function isPlainObject(obj: any): boolean;
export declare function isEmpty(value: any): boolean;
export declare function hasOwnProperty(obj: any, key: any): boolean;
export declare function downlevelIteration(...args: any[]): any[];
