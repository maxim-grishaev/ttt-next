export const getFieldIndexByCoords = (ri: number, ci: number) => ri * 3 + ci;
export const getCoordsByFieldIndex = (fi: number) => [
  Math.floor(fi / 3),
  fi % 3,
];
