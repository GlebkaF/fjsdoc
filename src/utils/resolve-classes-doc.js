// @flow
import R from "ramda"
import type { File, ClassDoc } from "../types"

export default function resolveClasesDoc({
  program,
  comments,
}: File): ClassDoc[] {
  const exportDeclarations = [
    "ExportDefaultDeclaration",
    "ExportNamedDeclaration",
  ]

  const typeEquals = (value: any) => ({ type }) => R.equals(type, value)
  const typeContains = (arr: Array<any>) => ({ type }) => R.contains(type, arr)

  const commentBlocks = R.filter(typeEquals("CommentBlock"), comments)

  const mapDeclarationToDoc = ({ id, loc }) => {
    const { name } = id
    const classStartLine = loc.start.line
    const linkedComment = R.find(
      R.pathEq(["loc", "end", "line"], classStartLine - 1),
      commentBlocks,
    )
    return {
      name,
      description: linkedComment.value,
      methods: [],
    }
  }

  return R.pipe(
    R.filter(typeContains(exportDeclarations)),
    R.map(({ declaration }) => declaration),
    R.filter(typeEquals("ClassDeclaration")),
    R.map(mapDeclarationToDoc),
  )(program.body)
}
