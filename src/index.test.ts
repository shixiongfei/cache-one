/*
 * index.test.ts
 *
 * Copyright (c) 2023-2024 Xiongfei Shi
 *
 * Author: Xiongfei Shi <xiongfei.shi(a)icloud.com>
 * License: Apache-2.0
 *
 * https://github.com/shixiongfei/cache-one
 */

import { cacheOne, cacheOneAsync } from "./index.js";

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const ticker = cacheOne(
  (ts) => `${ts.getHours() * 10000 + ts.getMinutes() * 100 + ts.getSeconds()}`,
  (ts: Date) => [ts, digits[ts.getTime() % digits.length]],
);

const tickerAsync = cacheOneAsync(
  (ts) => `${ts.getHours() * 10000 + ts.getMinutes() * 100 + ts.getSeconds()}`,
  async (ts: Date) => [ts, digits[ts.getTime() % digits.length]],
);

const timer = setInterval(() => {
  const now = new Date();
  console.log("Now:", now, "Sync Cached:", ticker(now));
}, 300);

const timerAsync = setInterval(async () => {
  const now = new Date();
  console.log("Now:", now, "Async Cached:", await tickerAsync(now));
}, 400);

setTimeout(() => {
  clearInterval(timer);
  clearInterval(timerAsync);
}, 5000);
