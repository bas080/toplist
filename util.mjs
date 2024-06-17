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
