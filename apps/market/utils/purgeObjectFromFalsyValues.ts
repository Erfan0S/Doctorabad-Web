export const purgeObjectFromFalsyValues = <T extends Object>(ob: T, ignoreZero = false) =>
  Object.entries(ob).reduce(
    (prev, [key, val]) =>
      val || (ignoreZero && parseInt(val as any) === 0) ? { ...prev, [key]: val } : prev,
    {} as T
  );
