import { expect } from "chai"
import R from "ramda"

import parseFile from "./parse-file"

import resolveClasesDoc from "./resolve-classes-doc"

describe("parse-classes.js", () => {
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

    it("Should return raw jsdoc of the classes", () => {
      const ast = parseFile(code)
      const classesDoc = resolveClasesDoc(ast)

      const expectedRawComments = [
        "*\n       * This is the comment block we are looking for.\n       * This line making it multiline\n       ",
        "*\n       * This doc attached to NamedExport\n       ",
      ]
      const actualDescriptions = classesDoc.map(R.path(["jsdoc", ["raw"]]))

      expect(actualDescriptions).to.be.deep.equal(expectedRawComments)
    })
  })

  describe("Class declaration", () => {
    const code = `
      export default class BasicClass {
        /**
         * This is constructor
         */
        constructor(a: MyFancyType, b: ?boolean): AnotherFancyType {}

        /**
         * This is public method
         */
        publicMethod(c: string, d: ?NullableFancyType) {}

        /**
         * This is private method
         */
        _privateMethod(): number {}
      }
    `

    it("Should return names of the class methods", () => {
      const ast = parseFile(code)
      const classesDoc = resolveClasesDoc(ast)

      const expectedNames = ["constructor", "publicMethod", "_privateMethod"]
      const actualNames = classesDoc[0].methods.map(R.path(["name"]))

      expect(actualNames).to.be.deep.equal(expectedNames)
    })

    it("Should return raw jsdocs of the class methods", () => {
      const ast = parseFile(code)
      const classesDoc = resolveClasesDoc(ast)

      const expectedRawComments = [
        "*\n         * This is constructor\n         ",
        "*\n         * This is public method\n         ",
        "*\n         * This is private method\n         ",
      ]
      const actualNames = classesDoc[0].methods.map(R.path(["jsdoc", "raw"]))
      expect(actualNames).to.be.deep.equal(expectedRawComments)
    })

    it("Should return flow types of the class methods", () => {
      const ast = parseFile(code)
      const classesDoc = resolveClasesDoc(ast)

      const constructorTypes = {
        params: [
          {
            name: "a",
            type: "MyFancyType",
            isNullable: false,
          },
          {
            name: "b",
            type: "boolean",
            isNullable: true,
          },
        ],
        returns: {
          name: "unnamed",
          type: "AnotherFancyType",
          isNullable: false,
        },
      }

      const publicMethodTypes = {
        params: [
          {
            name: "c",
            type: "string",
            isNullable: false,
          },
          {
            name: "d",
            type: "NullableFancyType",
            isNullable: true,
          },
        ],
        returns: {
          name: "unnamed",
          type: "void",
          isNullable: false,
        },
      }

      const privateMethodTypes = {
        params: [],
        returns: {
          name: "unnamed",
          type: "number",
          isNullable: false,
        },
      }

      const expectedTypes = [
        constructorTypes,
        publicMethodTypes,
        privateMethodTypes,
      ]

      const actualNames = classesDoc[0].methods.map(R.path(["flow"]))
      expect(actualNames).to.be.deep.equal(expectedTypes)
    })
    /**
     * TODO: Flow test-cases return && params:
     * number
     * string
     * boolean
     * void
     * null
     * Object
     * Array
     * ?string
     * string[]
     * ?FancyType[]
     * FancyType[]
     * FancyType | string
     * string | string
     * FancyType | AnotherFancyType
     * ?FancyType | string
     */
  })
})
