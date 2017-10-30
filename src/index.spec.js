import { expect } from "chai"
import init from "./index"

describe("index.js", () => {
  it("Should be a function", () => {
    expect(init).to.be.a("function")
  })
})
