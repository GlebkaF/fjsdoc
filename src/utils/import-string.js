// @flow
import fs from "fs"

/**
 * Import file at the given path as a string
 * @param {string} path
 * @return {Promise<string>}
 */
export default function importString(path: string): Promise<string> {
  return fs.existsSync(path)
    ? Promise.resolve(fs.readFileSync(path, "utf8"))
    : Promise.reject(new Error(`File at given path: ${path} doesn't exist`))
}
