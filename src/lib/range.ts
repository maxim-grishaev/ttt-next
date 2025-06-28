export const range = <T>(n: number, fn: (n: number) => T) =>
  Array.from({ length: n }).map((_, i) => fn(i));
