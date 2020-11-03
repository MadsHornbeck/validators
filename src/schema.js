const isAsync = /*#__PURE__*/ (ent) =>
  ent.some(([, e]) =>
    Array.isArray(e)
      ? e.some((r) => r instanceof Promise)
      : e instanceof Promise
  );

function /*#__PURE__*/ fromEntries(ents) {
  const es = ents.filter(([, v]) => (Array.isArray(v) ? v.some(Boolean) : v));
  return es.length ? Object.fromEntries(es) : undefined;
}

async function /*#__PURE__*/ asyncFromEntries(ents) {
  const es = ents.map(async ([k, v]) => [
    k,
    await (Array.isArray(v) ? Promise.all(v) : v),
  ]);
  return fromEntries(await Promise.all(es));
}

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
    const entries = Object.entries(validate).map(([k, f]) => [
      k,
      Array.isArray(values[k]) ? values[k].map(f) : f(values[k]),
    ]);
    return isAsync(entries) ? asyncFromEntries(entries) : fromEntries(entries);
  };
}
