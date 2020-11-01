const isAsync = (ent) =>
  ent.some(([, e]) =>
    Array.isArray(e)
      ? e.some((r) => r instanceof Promise)
      : e instanceof Promise
  );

const maybeAsyncFromEntries = (ents) =>
  isAsync(ents)
    ? Promise.all(
        ents.map(async ([k, e]) => [
          k,
          await (Array.isArray(e) ? Promise.all(e) : e),
        ])
      ).then(Object.fromEntries)
    : Object.fromEntries(ents);

export default function /*#__PURE__*/ schema(s) {
  const fn = ([k, v]) => [
    k,
    typeof v === "function"
      ? v
      : Array.isArray(v)
      ? (val) => {
          for (const f of v) {
            const error = f(val);
            if (error) return error;
          }
        }
      : schema(v),
  ];
  const validate = Object.fromEntries(Object.entries(s).map(fn));
  return (values) => {
    const entries = Object.entries(values).map(([k, val]) => [
      k,
      Array.isArray(val) ? val.map((v) => validate[k](v)) : validate[k](val),
    ]);
    return maybeAsyncFromEntries(entries);
  };
}
