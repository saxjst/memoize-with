const memoizeWith = require(".");

describe("memoizeWith tests", () => {
  test("if a memoized function is call X times then the original function should be called only once", async () => {
    let customCache = {
      obj: {},
      get: async key => customCache.obj[key],
      set: async (key, value) => (customCache.obj[key] = value)
    };

    const arrayToString = array => JSON.stringify(array);
    const add = jest.fn((x, y) => x + y);

    const memoizedAdd = memoizeWith(customCache, arrayToString, add);

    await memoizedAdd(2, 2); //=> 4
    await memoizedAdd(2, 2); //=> 4
    await memoizedAdd(2, 2); //=> 4

    expect(add).toHaveBeenCalledTimes(1);
  });

  test("if a memoized function is call X times with the same parameters then result should always by the same", async () => {
    let customCache = {
      obj: {},
      get: async key => customCache.obj[key],
      set: async (key, value) => (customCache.obj[key] = value)
    };

    const arrayToString = array => JSON.stringify(array);
    const add = (x, y) => x + y;

    const memoizedAdd = memoizeWith(customCache, arrayToString, add);

    expect(await memoizedAdd(3, 2)).toBe(5);
    expect(await memoizedAdd(3, 2)).toBe(5);
    expect(await memoizedAdd(3, 2)).toBe(5);
  });

  test("if a memoized function is called then it should return the same result that the original function", async () => {
    let customCache = {
      obj: {},
      get: async key => customCache.obj[key],
      set: async (key, value) => (customCache.obj[key] = value)
    };

    const arrayToString = array => JSON.stringify(array);
    const add = (x, y) => x + y;

    const memoizedAdd = memoizeWith(customCache, arrayToString, add);

    expect(await memoizedAdd(10, 10)).toBe(add(10, 10));
    expect(await memoizedAdd(10, 10)).toBe(add(10, 10));
    expect(await memoizedAdd(10, 10)).toBe(add(10, 10));
  });
});
