// @flow
import { parse } from "babylon"

import type { File } from "../types"

const PARSE_OPTIONS = {
  sourceType: "module",
  plugins: ["flow", "classProperties", "objectRestSpread"],
}

/**
 * Parse given code into AST.
 *
 * @param {string} code - string which represents javascript code
 * @returns {File}
 */
export default function parseFile(code: string): File {
  return parse(code, PARSE_OPTIONS)
}
