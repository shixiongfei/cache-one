/*
 * index.ts
 *
 * Copyright (c) 2023-2024 Xiongfei Shi
 *
 * Author: Xiongfei Shi <xiongfei.shi(a)icloud.com>
 * License: Apache-2.0
 *
 * https://github.com/shixiongfei/cache-one
 */

const isPromise = <T>(value: T | Promise<T>): value is Promise<T> =>
  typeof value === "object" && value instanceof Promise;

export const cacheOne = <T, P extends Array<unknown>>(
  keyFn: (...args: P) => string,
  fn: (...args: P) => T,
) => {
  const cached: { value?: { key: string; data: T } } = {};

  const cachedFn = (...args: P): T => {
    const key = keyFn.apply(this, args);

    if (!cached.value) {
      cached.value = { key, data: fn.apply(this, args) };
    } else if (key !== cached.value.key) {
      cached.value.key = key;
      cached.value.data = fn.apply(this, args);
    }

    return cached.value.data;
  };

  return cachedFn;
};

export const cacheOneAsync = <T, P extends Array<unknown>>(
  keyFn: (...args: P) => Promise<string> | string,
  fn: (...args: P) => Promise<T> | T,
) => {
  const cached: { value?: { key: string; data: T } } = {};

  const cachedFn = async (...args: P): Promise<T> => {
    const keyGen = keyFn.apply(this, args);
    const key = isPromise(keyGen) ? await keyGen : keyGen;

    if (!cached.value) {
      const data = fn.apply(this, args);
      cached.value = { key, data: isPromise(data) ? await data : data };
    } else if (key !== cached.value.key) {
      const data = fn.apply(this, args);
      cached.value.key = key;
      cached.value.data = isPromise(data) ? await data : data;
    }

    return cached.value.data;
  };

  return cachedFn;
};
