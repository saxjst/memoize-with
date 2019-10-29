/** Memoize a function using a custom cache and a key formatter
 *
 * @param {Object} cache - object to store values into
 * @param {Function} keyFormater - function that generate the cache key
 * @param {Function} fn - function to memoize
 * @return {Function} memoized version of fn
 * @api public
 */
const memoizeWith = (cache, keyFormater, fn) => {
  return async function() {
    const key = keyFormater(arguments);

    if ((await cache.get(key)) === undefined) {
      const value = fn.apply(this, arguments);
      await cache.set(key, value);
    }

    return await cache.get(key);
  };
};

module.exports = memoizeWith;
