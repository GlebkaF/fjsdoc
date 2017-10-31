import { expect } from "chai"
import path from "path"
import parseFile from "./parse-file"
import importString from "./import-string"

import resolveClasesDoc from "./resolve-classes-doc"

describe("parse-classes.js", () => {
  it("Should be a function", () => {
    expect(resolveClasesDoc).to.be.a("function")
  })

  it("Should return class names for empty-classes file", async () => {
    const codePath = path.resolve("./examples/empty-classes.js")
    const code = await importString(codePath)
    const ast = parseFile(code)
    const classesDoc = resolveClasesDoc(ast)

    const expectedNames = ["DefaultEmptyClass", "NamedEmptyClass"]
    const actualNames = classesDoc.map(({ name }) => name)

    expect(actualNames).to.be.deep.equal(expectedNames)
  })

  it("Should return class descriptions for empty-class file", async () => {
    const codePath = path.resolve("./examples/empty-classes.js")
    const code = await importString(codePath)
    const ast = parseFile(code)
    const classesDoc = resolveClasesDoc(ast)

    const expectedDescriptions = [
      "*\n * This empty class uses default export\n ",
      "*\n * This empty class uses named export\n ",
    ]
    const actualDescriptions = classesDoc.map(({ description }) => description)

    expect(actualDescriptions).to.be.deep.equal(expectedDescriptions)
  })
})
