export const getIndicesByValue = <T>(needle: T, haystack: T[]) =>
  haystack
    .map((val, i) => (val === needle ? i : -1))
    .filter((val) => val !== -1);
