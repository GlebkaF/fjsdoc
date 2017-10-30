// @flow
// const babylon = require("babylon")
import { parse } from "babylon"

const PARSE_OPTIONS = {
  sourceType: "module",
  plugins: ["flow", "classProperties", "objectRestSpread"],
}

/**
 * Parse given code and prepare AST for generating docs.
 *
 * @param {string} code - string which represents javascript code
 */
export default function babylonParse(code: string): any {
  return parse(code, PARSE_OPTIONS)
}
