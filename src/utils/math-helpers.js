/**
 * A modulus math operation that will work for negative numbers as well
 *  
 * @param {Number} n The primary number to perform the operation on
 * @param {Number} m The limit to calculated the remainder
 */
export const mod = (n, m) => {
  return ((n % m) + m) % m;
};
