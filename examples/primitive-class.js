// @flow

/**
 * PrimitiveClass uses only primitive types on it's JSdoc and flow annotation.
 * It has two methods. The first one returns a value and the second is not.
 */
export default class PrimitiveClass {
  a: boolean
  b: number

  /**
   * Class's constructor may also has it's jsdoc annotation.
   *
   * @param {boolean} a - first param
   * @param {number} b - second param
   */
  constructor(a: boolean, b: number) {
    this.a = a
    this.b = b
  }

  /**
   * This method has a return statement.
   *
   * @param {boolean} c - just a function param
   * @returns {string}
   */
  returnMethod(c: boolean): string {
    return c ? "true" : "false"
  }

  /**
   * This method doesn't have a return statement.
   *
   * @param {boolean} d - an another function param
   */
  returnlessMethod(d: string) {
    console.log(`Handling string: ${d}`)
  }
}
