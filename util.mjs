export const memoize = (fn) => {
  const cache = {};

  return (value, ...rest) => {
    if (value in cache) return cache[value];
    return (cache[value] = fn(value, ...rest));
  };
};

export const findMax = (valueFn, array) =>
  array.reduce((current, item) =>
    valueFn(item) > valueFn(current) ? item : current,
  );

export const head = (a) => (a.length ? [a[0]] : []);
export const rest = ([, ...b]) => b;

export const noop = () => {};
export const isNil = (x) => x == null;

export const tryReject = (fn) => {
  try {
    fn();
  } catch (error) {
    Promise.reject(error);
  }
};

export const moveItemToTop = (arr, n) => {
  if (n < 0 || n >= arr.length) throw new Error("Index out of bounds");

  const item = arr.splice(n, 1)[0]; // Remove the item at index n and get it
  arr.unshift(item); // Add the item to the beginning of the array

  return arr;
};

export const tryCatch = (doFn, catchFn) => {
  try {
    return doFn();
  } catch (error) {
    return catchFn(error);
  }
};

export const identity = (x) => x;

export const isNotEmpty = (x) => (x ? x.length !== 0 : true);
