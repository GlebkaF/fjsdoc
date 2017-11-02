import { expect } from "chai"
import R from "ramda"

import parseFile from "./parse-file"

import resolveClasesDoc from "./resolve-classes-doc"

describe("parse-classes.js", () => {
  it("Should be a function", () => {
    expect(resolveClasesDoc).to.be.a("function")
  })

  describe("Class declarations within export declarations", () => {
    const code = `
      /**
       * This is the comment block we are looking for.
       * This line making it multiline
       */
      export default class DefaultExport {}

      /**
       * This doc attached to NamedExport
       */
      export class NamedExport {}
    `

    it("Should return class names", () => {
      const ast = parseFile(code)
      const classesDoc = resolveClasesDoc(ast)

      const expectedNames = ["DefaultExport", "NamedExport"]
      const actualNames = classesDoc.map(R.path(["name"]))

      expect(actualNames).to.be.deep.equal(expectedNames)
    })

    it.only("Should return linked to the class comment block", () => {
      const ast = parseFile(code)
      const classesDoc = resolveClasesDoc(ast)

      const expectedDescriptions = [
        "*\n       * This is the comment block we are looking for.\n       * This line making it multiline\n       ",
        "*\n       * This doc attached to NamedExport\n       ",
      ]
      const actualDescriptions = classesDoc.map(R.path(["description"]))

      expect(actualDescriptions).to.be.deep.equal(expectedDescriptions)
    })
  })

  describe("Class declaration", () => {
    const code = `
      export default class BasicClass {
        /**
         * This is constructor
         */
        constructor() {}

        /**
         * This is public method
         */
        publicMethod(a: string): string {}

        /**
         * This is private method
         */
        _privateMethod() {}
      }
    `

    it("Should return class methods names", () => {
      const ast = parseFile(code)
      const classesDoc = resolveClasesDoc(ast)

      const expectedNames = ["constructor", "publicMethod", "_privateMethod"]
      const actualNames = classesDoc[0].methods.map(R.path(["name"]))

      expect(actualNames).to.be.deep.equal(expectedNames)
    })

    it("Should return raw methods descriptions", () => {
      const ast = parseFile(code)
      const classesDoc = resolveClasesDoc(ast)

      const expectedNames = [
        "*\n         * This is constructor\n         ",
        "*\n         * This is public method\n         ",
        "*\n         * This is private method\n         ",
      ]
      const actualNames = classesDoc[0].methods.map(R.path(["description"]))

      expect(actualNames).to.be.deep.equal(expectedNames)
    })
  })
})
