import JElementObject from "./JElementObject";
import ElementOptions from "./JElementOptions";
import ElementExtend from "./JElementExtend";
declare function JElement(selector: string | HTMLElement, options?: ElementOptions | any): JElementObject;
declare namespace JElement {
    var fn: any;
    var prototype: any;
    var extend: typeof ElementExtend;
}
export default JElement;
