export default function /*#__PURE__*/ validateFn(predicate, message, value) {
  if (typeof predicate !== "function")
    throw new TypeError("predicate is not a function");

  if (
    arguments.length < validateFn.length ||
    arguments.length <= predicate.length
  )
    return (...args) => validateFn(...arguments, ...args);

  const valid = predicate(value);
  if (typeof valid !== "function")
    return value === "" || valid ? undefined : message;

  const args = [...arguments].slice(1);
  return validateFn(
    predicate(...args.slice(0, predicate.length)),
    ...args.slice(predicate.length)
  );
}
