# memoize-with

[![Build Status](https://travis-ci.org/saxjst/memoize-with.svg?branch=master)](https://travis-ci.org/saxjst/memoize-with)
[![Coverage Status](https://coveralls.io/repos/github/saxjst/memoize-with/badge.svg?branch=master)](https://coveralls.io/github/saxjst/memoize-with?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/841af7743a474bb61775/maintainability)](https://codeclimate.com/github/saxjst/memoize-with/maintainability)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/saxjst/memoize-with.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/saxjst/memoize-with/context:javascript)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)

> Memoize a function using a custom cache and a key formatter

## Install

```
$ npm install s-memoize-with
```

## Usage

```js
const memoizeWith = require("s-memoize-with");

let customCache = {
obj: {},
get: async (key) => customCache.obj[key],
set: async (key, value) => customCache.obj[key] = value
};

// random function to create a key for the cache
const arrayToString = array => JSON.stringify(array):

let count = 0;

// random function to memoize
const add = (x, y) => {
count += 1;
return x + y;
}

const cachedAdd = memoizeWith(customCache, arrayToString, add);

(async () => {
await cachedAdd(2, 2); //=> 4
await cachedAdd(2, 2); //=> 4
await cachedAdd(2, 2); //=> 4
count; //=> 1
})()
```

## API

### memoizeWith(cache, keyFormater, fn) ⇒ <code>Function</code>

Memoize a function using a custom cache and a key formatter

**Returns**: <code>Function</code> - memoized version of `fn`

| Param       | Type                  | Description                          |
| ----------- | --------------------- | ------------------------------------ |
| cache       | <code>Object</code>   | object to store values into          |
| keyFormater | <code>Function</code> | function that generate the cache key |
| fn          | <code>Function</code> | function to memoize                  |

## License

Apache 2.0 © [saxjst]()
