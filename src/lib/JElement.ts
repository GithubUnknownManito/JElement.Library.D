import JElementObject from "./JElementObject";
import ElementOptions from "./JElementOptions";
import ElementExtend from "./JElementExtend";
import * as JElementStatic from "./JElementStatic";

export default function JElement(
  selector: string | HTMLElement,
  options?: ElementOptions | any
): JElementObject {
  return new JElement.fn.ref(selector, options);
}
JElement.fn = JElement.prototype = Object.create(JElementObject.prototype);

JElement.fn.ref = function (
  selector: string | HTMLElement,
  options?: ElementOptions | any
) {
  this.init(selector, options);
};
JElement.fn.extend = ElementExtend;
JElement.extend = ElementExtend;

JElement.fn.ref.prototype = JElement.fn;

JElement.extend({
  ...JElementStatic,
});

delete JElement["default"];

JElement.fn.extend(JElementStatic.default);
