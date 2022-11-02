/**
 * 缓存内容
 * 向对象中增加get/set
 * 向标签对象增加属性，再查询存在缓存
 */
import { uuidCache } from "./JElementUuid";

function acceptData(owner: any) {
  return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
}

export function cache(owner: any) {
  let value = owner[uuidCache];
  if (!value) {
    value = {};
    if (acceptData(owner)) {
      if (owner.nodeType) {
        owner[uuidCache] = value;
      } else {
        Object.defineProperty(owner, uuidCache, {
          value: value,
          configurable: true,
        });
      }
    }
  }
  return value;
}

export function getCache(owner: any, key: string) {
  const cacheData = cache(owner);
  key.match(/[A-Z]/)?.forEach((U) => {
    key = key.replace(U, `-${U}`.toLowerCase());
  });
  return cacheData[key];
}

export function setCache(owner: any, key: string, value: any) {
  const cacheData = cache(owner);
  key.match(/[A-Z]/)?.forEach((U) => {
    key = key.replace(U, `-${U}`.toLowerCase());
  });
  return (cacheData[key] = value);
}

export function detachCache(owner: any) {
  const value = owner[uuidCache];
  if (value) {
    owner[uuidCache] = undefined;
  }
  try {
    delete owner[uuidCache];
  } catch (e) {
    // console.warn('removeCache', 'undefined delete')
  }
}

export function removeCache(owner: any, key: string) {
  const cacheData = cache(owner);
  if (cacheData) {
    cacheData[key] = undefined;
    delete cacheData[key];
  }
}
