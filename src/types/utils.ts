export type ConvertDateToString<T> = {
  [K in keyof T]: T[K] extends Date | null ? string | null : T[K];
};
