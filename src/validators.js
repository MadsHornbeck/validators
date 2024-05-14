import validateFn from "./validateFn";

// TODO: add unit tests for all validation functions

export const pattern = /*#__PURE__*/ (regex, ...rest) => {
  if (!(regex instanceof RegExp))
    throw new Error(`${regex} is not a valid regex`);
  return validateFn((value) => regex.test(value), ...rest);
};

export /*#__PURE__*/ function required(message, value) {
  if (arguments.length < 2)
    return (...args) => required(...[...arguments].concat(args));
  return value != null && value !== "" ? undefined : message;
}

export const maxLength = /*#__PURE__*/ validateFn((length) => (v) =>
  v != null && String(v).length <= length
);

export const minLength = /*#__PURE__*/ validateFn((length) => (v) =>
  v != null && String(v).length >= length
);

export const max = /*#__PURE__*/ validateFn((max) => (v) => v <= max);
export const min = /*#__PURE__*/ validateFn((min) => (v) => v >= min);

export const smaller = /*#__PURE__*/ validateFn((input) => (v) =>
  v < input.meta.actualValue
);
export const greater = /*#__PURE__*/ validateFn((input) => (v) =>
  v > input.meta.actualValue
);

export const negative = /*#__PURE__*/ (v) => v < 0;
export const positive = /*#__PURE__*/ (v) => v > 0;

export const email = /*#__PURE__*/ pattern(/^[^\s@]+@[^\s@]+\.[^\s@.]+$/i);

// https://en.wikipedia.org/wiki/Luhn_algorithm
const luhnAlgo = (ds) => {
  const sum = [...ds]
    .reverse()
    .map((v, i) => v * ((i % 2) + 1))
    .map((v) => (v > 10 ? v - 9 : v))
    .reduce((a, b) => a + b);
  return sum % 10 === 0;
};

export const creditCard = /*#__PURE__*/ validateFn((str) => {
  const arr = [...str].map(Number);
  return !!arr.length && !arr.some(Number.isNaN) && luhnAlgo(arr);
});

export const guid = /*#__PURE__*/ validateFn(
  (str) =>
    // Can guids even be wrapped in []?
    /(^{.*}$|^\(.*\)$|^\[.*\]$|^[^([{].*[^}\])]$)/.test(str) &&
    /[\da-f]{8}([:-])?[\da-f]{4}\1[1-5][\da-f]{3}\1[\da-f]{4}\1[\da-f]{12}/i.test(
      str
    )
);

// TODO
// const isoDate = () => {};
