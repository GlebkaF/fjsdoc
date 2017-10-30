import { expect } from "chai"
import path from "path"
import importString from "./import-string"

describe("import-string.js", () => {
  it("Should return promise with the sting content of the file for existing path", () => {
    const codePath = path.resolve("./examples/primitive-class.js")

    return importString(codePath).then(string => {
      expect(string).to.be.a("string")
    })
  })

  it("Should reject promise for non-existing path", () => {
    const codePath = path.resolve("../some/non/existing/path/file.js")

    return importString(codePath).catch(error => {
      expect(error.message).to.match(/^File at given path:.*doesn't exist$/)
    })
  })
})
