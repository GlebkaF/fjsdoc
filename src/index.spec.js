import { expect } from "chai"
import path from "path"

import index from "./index"

describe.only("index.js", () => {
  it("Should be a function", () => {
    expect(index).to.be.a("function")
  })

  it("Should return class name for primitive-class", () => {
    const codePath = path.resolve("./examples/primitive-class.js")
    return index(codePath).then(className => {
      expect(className).to.be.equal("PrimitiveClass")
    })
  })
})
