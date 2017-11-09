// @flow
import {
  equals,
  contains,
  map,
  filter,
  pipe,
  cond,
  always,
  T,
  path,
  pathEq,
  pathOr,
  find,
} from "ramda"
import type {
  File,
  Node,
  ClassDeclaration,
  ClassMethod,
  CommentBlock,
  ClassDoc,
  FunctionDoc,
  FlowTypes,
  TypeDef,
  ParamIdentifier,
} from "../types"

/**
 * 
 * @param {any} value
 * @param {Node} node
 * @returns {boolean}
 */
const equalsType = (value: any) => ({ type }) => equals(type, value)

/**
 * 
 * @param {any[]} arr
 * @param {Node} node
 * @returns {boolean}
 */
const containsType = (arr: any[]) => ({ type }) => contains(type, arr)

/**
 * 
 * @param {ParamIdentifier} paramIdentifier
 * @returns {string}
 */
const resolveFlowTypeName = cond([
  [
    pathEq(["type"], "Identifier"),
    pipe(path(["typeAnnotation"]), x => resolveFlowTypeName(x)),
  ],
  [
    pathEq(["type"], "NullableTypeAnnotation"),
    pipe(path(["typeAnnotation"]), x => resolveFlowTypeName(x)),
  ],
  [
    pathEq(["type"], "TypeAnnotation"),
    pipe(path(["typeAnnotation"]), x => resolveFlowTypeName(x)),
  ],
  [pathEq(["type"], "GenericTypeAnnotation"), path(["id", "name"])],
  [pathEq(["type"], "StringTypeAnnotation"), always("string")],
  [pathEq(["type"], "NumberTypeAnnotation"), always("number")],
  [pathEq(["type"], "BooleanTypeAnnotation"), always("boolean")],
  [pathEq(["type"], "VoidTypeAnnotation"), always("void")],
  [pathEq(["type"], "NullLiteralTypeAnnotation"), always("void")],
  [pathEq(["type"], "AnyTypeAnnotation"), always("any")],
  [T, always("void")],
])

/**
 * 
 * @param {ParamIdentifier} param
 * @returns {TypeDef}
 */
const mapFlowTypeDef = (param: ParamIdentifier): TypeDef => ({
  name: pathOr("unnamed", ["name"], param),
  type: resolveFlowTypeName(param),
  isNullable: pathEq(
    ["typeAnnotation", "typeAnnotation", "type"],
    "NullableTypeAnnotation",
    param,
  ),
})

/**
 * @param {ClassMethod} classMethod
 * @returns {FlowTypes}
 */
const resolveClassMethodFlowTypes = (classMethod: ClassMethod): FlowTypes => ({
  params: pipe(path(["params"]), map(mapFlowTypeDef))(classMethod),
  returns: mapFlowTypeDef(path(["returnType"], classMethod)),
})

/**
 * 
 * @param {ClassMethod} classMethod 
 * @returns {FunctionDoc}
 */
const mapClassMethodToDoc = (classMethod): FunctionDoc => ({
  name: path(["key", "name"], classMethod),
  flow: resolveClassMethodFlowTypes(classMethod),
  jsdoc: {
    raw: path(["leadingComments", "0", "value"], classMethod),
    description: path(["leadingComments", "0", "value"], classMethod),
  },
})

/**
 * 
 * @param {ClassDeclaration} classDeclaration
 * @returns {FunctionDoc[]}
 */
const resolveMethodsDocs = pipe(
  path(["body", "body"]),
  filter(equalsType("ClassMethod")),
  map(mapClassMethodToDoc),
)

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
  const nodeStartLine = path(["loc", "end", "line"], node)
  return pipe(
    find(pathEq(["loc", "end", "line"], nodeStartLine - 1)),
    pathOr("", ["value"]),
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
  jsdoc: {
    raw: findLinkedCommentBlock(commentBlocks)(classDeclaration),
    description: findLinkedCommentBlock(commentBlocks)(classDeclaration),
  },
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

  const commentBlocks = filter(equalsType("CommentBlock"), comments)
  return pipe(
    filter(containsType(exportDeclarations)),
    map(path(["declaration"])),
    filter(equalsType("ClassDeclaration")),
    map(mapClassDeclarationToDoc(commentBlocks)),
  )(program.body)
}
