import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/functions";

export default eventHandler((event) => {
  const constru = getStore('testing');
  console.log('store', constru);
  return {
    hello: 'world',
  }
});
