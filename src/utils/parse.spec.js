import { expect } from "chai"

import parse from "./parse"

describe.only("parse.js", () => {
  it("Should return AST for valid JS code", () => {
    const code = `
      import _ from 'lodash'
      const a = 5
    `
    const { type, start, end } = parse(code)
    expect(type).to.be.equal("File")
    expect(start).to.be.equal(0)
    expect(end).to.be.equal(52)
  })

  it("Should throw error for invalid JS code", () => {
    const code = "function () => { const a = [1 2 3]}"
    const invalidParse = () => parse(code)
    expect(invalidParse).to.throw()
  })
})
