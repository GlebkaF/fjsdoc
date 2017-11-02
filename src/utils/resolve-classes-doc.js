// @flow
import R from "ramda"
import type {
  File,
  Node,
  ClassDeclaration,
  ClassMethod,
  CommentBlock,
  ClassDoc,
  FunctionDoc,
} from "../types"

/**
 * 
 * @param {any} value
 * @param {Node} node
 * @returns {boolean}
 */
const typeEquals = (value: any) => ({ type }) => R.equals(type, value)

/**
 * 
 * @param {any[]} arr
 * @param {Node} node
 * @returns {boolean}
 */
const typeContains = (arr: any[]) => ({ type }) => R.contains(type, arr)

/**
 * 
 * @param {ClassMethod} classMethod 
 * @returns {FunctionDoc}
 */
const mapClassMethodToDoc = (classMethod): ClassMethod => ({
  name: R.path(["key", "name"], classMethod),
  description: R.path(["leadingComments", "0", "value"], classMethod),
})

/**
 * 
 * @param {ClassDeclaration} classDeclaration
 * @returns {FunctionDoc[]}
 */
const resolveMethodsDocs = (
  classDeclaration: ClassDeclaration,
): FunctionDoc[] =>
  R.pipe(
    R.path(["body", "body"]),
    R.filter(typeEquals("ClassMethod")),
    R.map(mapClassMethodToDoc),
  )(classDeclaration)

/**
 * Find linked comment in the comments section provided by babylon.
 * It looking for comment block which located one line above the specified node
 * @param {CommentBlock[]} comments
 * @param {Node} node
 * @returns {string}
 */
const findLinkedCommentBlock = (comments: CommentBlock[]) => (
  node: Node,
): string => {
  const nodeStartLine = R.path(["loc", "end", "line"], node)
  return R.pipe(
    R.find(R.pathEq(["loc", "end", "line"], nodeStartLine - 1)),
    R.pathOr("", ["value"]),
  )(comments)
}

/**
 * 
 * @param {CommentBlock[]} commentBlocks 
 * @param {ClassDeclaration}
 * @returns {ClassDoc}
 */
const mapClassDeclarationToDoc = commentBlocks => (
  classDeclaration,
): ClassDoc => ({
  name: classDeclaration.id.name,
  /**
   * We have to find linked comment manually in this case, because it's
   * actually linked to the export declaration not to the class declaration
   */
  description: findLinkedCommentBlock(commentBlocks)(classDeclaration),
  methods: resolveMethodsDocs(classDeclaration),
})

/**
 * 
 * @param {File} file
 * @returns {ClassDoc[]}
 */
export default function resolveClasesDoc({
  program,
  comments,
}: File): ClassDoc[] {
  const exportDeclarations = [
    "ExportDefaultDeclaration",
    "ExportNamedDeclaration",
  ]

  const commentBlocks = R.filter(typeEquals("CommentBlock"), comments)
  return R.pipe(
    R.filter(typeContains(exportDeclarations)),
    R.map(R.path(["declaration"])),
    R.filter(typeEquals("ClassDeclaration")),
    R.map(mapClassDeclarationToDoc(commentBlocks)),
  )(program.body)
}
