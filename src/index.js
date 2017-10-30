import parse from "./utils/parse"
import importString from "./utils/import-string"

export default function unnamed(path: string): string {
  return importString(path).then(code => {
    console.log(code)
    const AST = parse(code)
    console.log(AST)
  })
}
