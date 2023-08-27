/*
 * test.ts
 *
 * Copyright (c) 2023 Xiongfei Shi
 *
 * Author: Xiongfei Shi <xiongfei.shi(a)icloud.com>
 * License: Apache-2.0
 *
 * https://github.com/shixiongfei/cache-one
 */

import cacheOne from "../src/index";

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const ticker = cacheOne(
  (ts) => `${ts.getHours() * 10000 + ts.getMinutes() * 100 + ts.getSeconds()}`,
  (ts: Date) => [ts, digits[ts.getTime() % digits.length]],
);

const timer = setInterval(() => {
  const now = new Date();
  console.log("Now:", now, "Cached:", ticker(now));
}, 300);

setTimeout(() => clearInterval(timer), 5000);
