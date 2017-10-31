import { expect } from "chai"

import parseFile from "./parse-file"

describe("parse-file.js", () => {
  it("Should return AST for valid JS code", () => {
    const code = `
      import _ from 'lodash'
      const a = 5
    `
    const { type, start, end } = parseFile(code)
    expect(type).to.be.equal("File")
    expect(start).to.be.equal(0)
    expect(end).to.be.equal(52)
  })

  it("Should throw error for invalid JS code", () => {
    const code = "function () => { const a = [1 2 3]}"
    const invalidParse = () => parseFile(code)
    expect(invalidParse).to.throw()
  })
})
