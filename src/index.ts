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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cacheOne = <T extends (...args: readonly any[]) => any>(
  keyFn: (...v: Parameters<T>) => string,
  fn: T,
): T => {
  const cached: { key?: string; data?: ReturnType<T> } = {};
  const cachedFn = (...args: Parameters<T>) => {
    const key = keyFn.apply(this, args);
    if (key !== cached.key) {
      cached.key = key;
      cached.data = fn.apply(this, args);
    }
    return cached.data as ReturnType<T>;
  };
  return cachedFn as T;
};

export default cacheOne;
