/**
 *
 */

export const isNumeric = (value: any): boolean => {
  return value && !isNaN(Number(value));
};
